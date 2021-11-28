import { useQuery } from '@apollo/client';
import React from 'react';
import Wrapper from '../components/Wrapper';
import gql from 'graphql-tag';
import { perPage } from '../config';
import CourseCard from '../components/CourseCard';

const ALL_TRENDING_COURSES = gql`
  query ALL_TRENDING_COURSES($skip: Int = 5, $take: Int) {
    courses(
      skip: $skip
      take: $take
      where: { watchedCount: { gt: 0 } }
      orderBy: { watchedCount: desc }
    ) {
      id
      title
      description
      status
      category
      author {
        name
      }
      thumbnail
    }
  }
`;

function Trending() {
  const { data, loading, error, fetchMore } = useQuery(ALL_TRENDING_COURSES, {
    variables: {
      skip: 0,
      take: perPage,
    },
    notifyOnNetworkStatusChange: true,
  });

  function fetchMoreCourses() {
    fetchMore({
      variables: {
        skip: data?.courses.length,
      },
    });
  }

  console.log('********************* DATA **********************');
  console.log(data);

  return (
    <Wrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center mb-20">
        {data?.courses.map((course) => (
          <CourseCard
            key={course.id}
            author={course.author.name}
            category={course.category}
            thumbnail={course.thumbnail || ''}
            title={course.title}
            description={course.description}
            id={course.id}
          />
        ))}
      </div>
      <div className="items-center flex flex-row text-center justify-center mb-10">
        <button
          type="submit"
          onClick={fetchMoreCourses}
          className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
          disabled={loading}
        >
          <div className=" flex justify-center items-center space-x-2">
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            ) : (
              ''
            )}
            <p>Load More</p>
          </div>
        </button>
      </div>
    </Wrapper>
  );
}

export default Trending;
