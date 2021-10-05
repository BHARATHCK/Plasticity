import Image from 'next/image';
import { AnnotationIcon } from '@heroicons/react/outline';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import CommentComponent from './CommentComponent';

const ALL_COMMENTS_QUERY = gql`
  query ALL_COMMENTS_QUERY {
    comments {
      id
      comment
      user {
        name
      }
    }
  }
`;

function ReveiwCardComponent() {
  const { data, loading } = useQuery(ALL_COMMENTS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  console.log('Comment Data : ', data);
  return (
    <div className="bg-custom-white">
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center mt-20">
        {data?.comments.map((element, index) => (
          <CommentComponent key={index} comment={element} />
        ))}
      </div>
    </div>
  );
}

export default ReveiwCardComponent;
