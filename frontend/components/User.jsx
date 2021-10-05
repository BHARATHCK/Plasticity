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
        isSubscribed
        subscription {
          id
          price
          plan
          chargeId
        }
        comment {
          course {
            id
          }
        }
        rating {
          id
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
