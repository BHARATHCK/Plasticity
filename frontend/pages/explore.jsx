import { useQuery } from '@apollo/client';
import React from 'react';
import Wrapper from '../components/Wrapper';
import gql from 'graphql-tag';
import CourseCard from '../components/CourseCard';

const ALL_COURSES_QUERY = gql`
  query ALL_COURSES_QUERY {
    courses {
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
  const { data, loading, error } = useQuery(ALL_COURSES_QUERY);
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
            publishedDate={new Date().toISOString()}
            description={course.description}
            id={course.id}
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default Explore;
