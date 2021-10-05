import { useQuery } from '@apollo/client';
import React from 'react';
import Wrapper from '../components/Wrapper';
import gql from 'graphql-tag';
import CourseCard from '../components/CourseCard';

const ALL_COURSES_QUERY = gql`
  query ALL_COURSES_QUERY($skip: Int = 0, $take: Int) {
    courses(skip: $skip, take: $take) {
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

function Explore() {
  const { data, loading, error, fetchMore } = useQuery(ALL_COURSES_QUERY, {
    variables: {
      skip: 0,
      take: 1,
    },
    notifyOnNetworkStatusChange: true,
  });
  console.log(data);

  function fetchMoreCourses() {
    fetchMore({
      variables: {
        skip: data?.courses.length,
      },
    });
  }
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
            publishedDate={new Date().toISOString()}
            description={course.description}
            id={course.id}
          />
        ))}
      </div>
      <div className="items-center flex flex-row text-center justify-center">
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

export default Explore;
