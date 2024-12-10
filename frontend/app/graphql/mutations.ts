import { gql } from '@apollo/client';

export const ADD_REPOSITORY = gql`
  mutation AddRepository($url: String!) {
    addRepository(url: $url) {
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

export const MARK_RELEASE_AS_SEEN = gql`
  mutation MarkReleaseAsSeen($releaseId: ID!) {
    markReleaseAsSeen(releaseId: $releaseId) {
      id
      seen
    }
  }
`;
