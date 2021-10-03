import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER {
    authenticatedItem {
      ... on User {
        id
        name
        email
        isEducator
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  console.log('DATA -------------> ', data);
  return data?.authenticatedItem;
}
