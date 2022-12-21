import { gql } from "@apollo/client";

export const GET_LAST_ISSUES = gql`
  query GetLastIssues($repositoryOwner: String!, $repositoryName: String!) {
    repositoryOwner(login: $repositoryOwner) {
      repository(name: $repositoryName) {
        issues(last: 5) {
          edges {
            node {
              title
              author {
                login
              }
              url
            }
          }
        }
      }
    }
  }
`;
