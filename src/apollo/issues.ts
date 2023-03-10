import { gql } from "@apollo/client";

export const ISSUE_NODE_FIELDS = gql`
  fragment IssueNodeFields on IssueEdge {
    node {
      id
      number
      title
      url
      body
      author {
        login
        avatarUrl
        url
      }
    }
  }
`;

export const GET_LAST_ISSUES = gql`
  ${ISSUE_NODE_FIELDS}
  query GetLastIssues(
    $repositoryOwner: String!
    $repositoryName: String!
    $before: String
  ) {
    repositoryOwner(login: $repositoryOwner) {
      repository(name: $repositoryName) {
        issues(last: 10, before: $before) {
          totalCount
          edges {
            cursor
            ...IssueNodeFields
          }
        }
      }
    }
  }
`;
