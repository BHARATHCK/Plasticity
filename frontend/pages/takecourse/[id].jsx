import React from 'react';
import NextImage from 'next/image';
import { useRouter } from 'next/dist/client/router';
import Wrapper from '../../components/Wrapper';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import NextLink from 'next/link';

const COURSE_DETAILS = gql`
  query COURSE_QUERY($id: ID!) {
    Course(where: { id: $id }) {
      id
      title
      description
      category
      status
      author {
        name
      }
      thumbnail
      Videos {
        video {
          publicUrl
        }
        description
        thumbnail
      }
    }
  }
`;

function TakeCourse() {
  const router = useRouter();

  const { data, loading, error } = useQuery(COURSE_DETAILS, {
    variables: {
      id: router.query.id,
    },
  });

  if (error?.message === 'You do not have access to this resource') {
    router.push('/login');
  }

  console.log('Query : ', data);

  return (
    <Wrapper>
      <div className="m-5 sm:shadow-lg">
        <div className="flex flex-col sm:flex-row sm:space-x-10 sm:p-10">
          <div>
            <NextImage
              src={
                data?.Course?.thumbnail ||
                'https://picsum.photos/seed/picsum/200/300'
              }
              alt="thumbnail of a course"
              width="270px"
              height="150px"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div>{data?.Course?.title}</div>
            <div className="flex flex-row space-x-2">
              <div>{new Date().toISOString()}</div>
              <div>{data?.Course?.category}</div>
            </div>
            <div>{data?.Course?.description}</div>
            <NextLink href={`/playcourse/${data?.Course?.id}`}>
              <button className="bg-black text-white font-bold py-2 px-4 rounded">
                Play
              </button>
            </NextLink>
          </div>
        </div>
        <div className="flex flex-col space-y-4 mt-10 sm:w-4/6 sm:p-10">
          <p className="text-lg font-semibold">Course Overview</p>
          {data?.Course?.Videos.map((video, index) => (
            <NextLink href={video.video.publicUrl} key={index}>
              <div className="flex flex-col border-2 shadow-md cursor-pointer">
                <div className="flex flex-row items-center space-x-4">
                  <p>{index + 1}</p>
                  <div>{video.description}</div>
                </div>
              </div>
            </NextLink>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default TakeCourse;