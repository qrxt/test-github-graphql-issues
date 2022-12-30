import { gql } from "@apollo/client";

export const ISSUE_COMMENT_NODE = gql`
  fragment IssueCommentFields on IssueCommentEdge {
    node {
      id
      body
      createdAt
      author {
        login
        avatarUrl
        url
      }
    }
  }
`;

// TODO: last N
// TODO: author fragment
export const GET_ISSUE = gql`
  ${ISSUE_COMMENT_NODE}
  query GetIssue(
    $repositoryOwner: String!
    $repositoryName: String!
    $number: Int!
  ) {
    repositoryOwner(login: $repositoryOwner) {
      repository(name: $repositoryName) {
        issue(number: $number) {
          title
          body
          url
          id
          author {
            login
            avatarUrl
            url
          }
          comments(first: 50) {
            edges {
              ...IssueCommentFields
            }
          }
        }
      }
    }
  }
`;

// Comments

export const ADD_COMMENT = gql`
  ${ISSUE_COMMENT_NODE}
  mutation AddComment($issueId: ID!, $commentBody: String!) {
    addComment(input: { subjectId: $issueId, body: $commentBody }) {
      clientMutationId
      commentEdge {
        ...IssueCommentFields
      }
    }
  }
`;
