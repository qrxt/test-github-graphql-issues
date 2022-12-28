import { GetLastIssuesQuery } from "../generated/graphql";
import { ArrayElement, Path } from "./path";

export type IssuesList = Path<
  GetLastIssuesQuery,
  ["repositoryOwner", "repository", "issues", "edges"]
>;

export type IssuesListItem = ArrayElement<IssuesList>;
export type IssueNode = Path<IssuesListItem, ["node"]>;
