import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    getRepositories {
      id
      name
      url
      description
      releases {
        id
        version
        release_date
        seen
      }
    }
  }
`;
