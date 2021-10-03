import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../components/User';
import { useRouter } from 'next/dist/client/router';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    endSession
  }
`;

function Profile() {
  const router = useRouter();
  const [signOut, { loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <div>
      {error ? (
        <p className="text-red-500 text-xs italic">{error.message}</p>
      ) : (
        ''
      )}
      <button
        onClick={async () => {
          try {
            let res = await signOut();
            if (res) {
              router.push('/');
            }
          } catch (error) {
            console.log(error);
          }
        }}
        disabled={loading}
        className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
