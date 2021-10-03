import { graphQLSchemaExtension } from '@keystone-next/keystone';
import checkout from './checkout';

// make a fake graphql tagged template literal
const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      checkout(token: String!): Boolean
    }
  `,
  resolvers: {
    Mutation: {
      checkout,
    },
  },
});