import React, { useState } from 'react';
import NextImage from 'next/image';
import { useRouter } from 'next/dist/client/router';
import Wrapper from '../../components/Wrapper';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import NextLink from 'next/link';
import useForm from '../../utils/useForm';
import { CURRENT_USER_QUERY, useUser } from '../../components/User';
import CommentComponent from '../../components/CommentComponent';
import RatingComponent from '../../components/RatingComponent';
import UserRating from '../../components/UserRating';
import ProgressComponent from '../../components/ProgressComponent';

const COURSE_DETAILS = gql`
  query COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      title
      description
      category
      status
      rating
      ratingCount
      author {
        name
      }
      thumbnail
      Videos {
        video {
          filename
        }
        description
        thumbnail
      }
    }
  }
`;

const ALL_COMMENTS_QUERY = gql`
  query ALL_COMMENTS_QUERY($courseId: ID) {
    comments(where: { course: { id: { equals: $courseId } } }) {
      id
      comment
      timestamp
      user {
        id
        name
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation SUBMIT_COMMENT_MUTATION(
    $comment: String!
    $timestamp: String!
    $courseId: ID!
    $userId: ID!
  ) {
    createComment(
      data: {
        comment: $comment
        timestamp: $timestamp
        course: { connect: { id: $courseId } }
        user: { connect: { id: $userId } }
      }
    ) {
      id
    }
  }
`;

function TakeCourse() {
  console.log('COMPONENT RENDERED');
  const router = useRouter();
  const user = useUser(CURRENT_USER_QUERY);
  const [userCommented, setUserCommented] = useState(false);
  const [userRated, setUserRated] = useState(false);

  const { data, loading, error } = useQuery(COURSE_DETAILS, {
    variables: {
      id: router.query.id,
    },
  });

  const { clearForm, inputs, handleChange, resetForm } = useForm({
    comment: '',
  });

  const { data: commentsData, loading: commentsLoading } = useQuery(
    ALL_COMMENTS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        courseId: router.query.id,
      },
    }
  );

  const [submitComment, { loading: commentSubmitting }] = useMutation(
    SUBMIT_COMMENT_MUTATION,
    {
      variables: {
        comment: inputs.comment,
        timestamp: new Date(),
        courseId: router.query.id,
        userId: user?.id,
      },
      notifyOnNetworkStatusChange: true,
      update: (cache) => {
        cache.evict({ fieldName: 'comments' });
      },
    }
  );

  if (error?.message === 'You do not have access to this resource') {
    router.push('/login');
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    let res = '';
    try {
      res = await submitComment();
    } catch (err) {
      res = err;
    }
    resetForm();
  }

  // If user has previosly commented -> dont show post comment
  console.log('User -> ', user);
  if (user?.comment) {
    user.comment.map((comment) => {
      if (comment.course.id === router.query.id && !userCommented) {
        console.log(comment.course.id + ' -- ' + router.query.id);
        setUserCommented(true);
      }
    });
    user.rating.map((course) => {
      if (course.id === router.query.id && !userRated) {
        userRated(true);
      }
    });
  }

  return (
    <>
      <Wrapper>
        <div className="m-5 sm:shadow-lg">
          <div className="flex flex-col sm:flex-row sm:space-x-10 sm:p-10">
            <div>
              <NextImage
                src={
                  data?.course?.thumbnail ||
                  'https://picsum.photos/seed/picsum/200/300'
                }
                alt="thumbnail of a course"
                width="270px"
                height="150px"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div>{data?.course?.title}</div>
              <RatingComponent points={data?.course?.rating} />
              <div className="flex flex-row space-x-2">
                <div>{new Date().toISOString()}</div>
                <div>{data?.course?.category}</div>
              </div>
              <div>{data?.course?.description}</div>
              <NextLink href={`/playcourse/${data?.course?.id}`}>
                <button className="bg-black text-white font-bold py-2 px-4 rounded">
                  Play
                </button>
              </NextLink>
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-10 sm:w-4/6 sm:p-10">
            <p className="text-lg font-semibold">Course Overview</p>
            {data?.course?.Videos.map((video, index) => (
              <div
                className="flex flex-col border-2 shadow-md cursor-pointer"
                key={index}
              >
                <div className="flex flex-row items-center space-x-4">
                  <p>{index + 1}</p>
                  <div>{video.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex flex-col space-y-4 mt-10 sm:w-4/6 sm:p-10">
              <div>
                <div className="text-gray-800 text-lg font-bold mb-5">
                  Rate the Course here
                </div>
                <UserRating
                  courseId={router.query.id}
                  currentRating={data?.course?.rating}
                  ratingCount={data?.course?.ratingCount}
                />
              </div>
              <h2 className="text-gray-800 text-lg font-bold">Comments</h2>
              {userCommented ? (
                <p>You have already commented on this course!</p>
              ) : (
                <form
                  className="w-full max-w-xl bg-white rounded-lg"
                  method="POST"
                  onSubmit={handleCommentSubmit}
                >
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full mb-2 mt-2">
                      <textarea
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="comment"
                        placeholder="Type Your Comment"
                        required
                        value={inputs.comment}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="w-full md:w-full flex items-start">
                      <div className="-mr-1">
                        <button
                          type="submit"
                          className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                          disabled={commentSubmitting}
                        >
                          <div className=" flex justify-center items-center space-x-2">
                            {commentSubmitting ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                            ) : (
                              ''
                            )}
                            <p>Post Comment</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 m-10 gap-4 pb-10">
              {commentsData ? (
                commentsData.comments.map((comment) => (
                  <div key={comment.id}>
                    <CommentComponent comment={comment} />
                  </div>
                  //<div key={comment.id}>{comment.comment}</div>
                ))
              ) : (
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default TakeCourse;
