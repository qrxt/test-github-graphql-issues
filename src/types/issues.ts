// Issues

import { GetIssueQuery, GetLastIssuesQuery } from "../generated/graphql";
import { ArrayElement, Path } from "./path";

export type IssuesList = Path<
  GetLastIssuesQuery,
  ["repositoryOwner", "repository", "issues", "edges"]
>;

export type IssuesListItem = ArrayElement<IssuesList>;
export type IssueNode = Path<IssuesListItem, ["node"]>;

// Issue

export type Issue = Path<
  GetIssueQuery,
  ["repositoryOwner", "repository", "issue"]
>;

export type IssueCommentsList = Path<Issue, ["comments", "edges"]>;

export type IssueCommentsListItem = ArrayElement<IssueCommentsList>;
export type IssueCommentNode = Path<IssueCommentsListItem, ["node"]>;

// Author

export type Author = Path<IssueCommentNode, ["author"]>;
