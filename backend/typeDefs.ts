import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

export const typeDefs = `#graphql
  type Query {
    getRepositories: [Repository]
  }

  type Repository {
    id: ID!
    name: String
    url: String
    description: String
    releases: [Release]
  }

  type Release {
    id: ID!
    version: String
    release_date: String
    seen: Boolean
  }

  type Mutation {
    addRepository(url: String!): Repository
    markReleaseAsSeen(releaseId: ID!): Release
    refreshRepository(repositoryId: ID!): Repository
  }
`;
