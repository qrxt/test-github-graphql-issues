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

export const GET_ISSUE = gql`
  ${ISSUE_COMMENT_NODE}
  query GetIssue(
    $repositoryOwner: String!
    $repositoryName: String!
    $number: Int!
    $after: String
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
          comments(first: 10, after: $after) {
            totalCount
            edges {
              cursor
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
