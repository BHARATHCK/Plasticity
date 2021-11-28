import { useQuery } from '@apollo/client';
import { gql } from 'apollo-client-preset';
import React from 'react';
import CourseCard from '../components/CourseCard';
import Wrapper from '../components/Wrapper';

const GET_ALL_COMMUNITIES = gql`
  query ALL_COMMUNITIES_QUERY($skip: Int = 0, $take: Int) {
    communities(skip: $skip, take: $take) {
      id
      title
      description
      Course {
        title
        thumbnail
      }
      author {
        name
      }
      thumbnail
    }
  }
`;

function Community() {
  const { data, fetchMore, loading } = useQuery(GET_ALL_COMMUNITIES, {
    notifyOnNetworkStatusChange: true,
  });

  function fetchMoreCommunities() {
    fetchMore({
      variables: {
        skip: data?.communities.length,
      },
    });
  }

  return (
    <Wrapper>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center content-center">
          <div>Hi there! 👋 Welcome to the Plasticity community</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center mb-20">
        {data?.communities.map((community) => (
          <CourseCard
            key={community.id}
            author={community.author.name}
            thumbnail={community.Course[0].thumbnail || ''}
            title={community.Course[0].title}
            description={community.description}
            id={community.id}
          />
        ))}
      </div>
      <div className="items-center flex flex-row text-center justify-center mb-10">
        <button
          type="submit"
          onClick={fetchMoreCommunities}
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

export default Community;
