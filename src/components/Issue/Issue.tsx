import React from "react";
import { Box, Button, Card, Heading, Stack } from "@chakra-ui/react";
import Loading from "components/Loading";
import { Comment, NewCommentForm } from "components/Comment";
import capitalize from "lodash/capitalize";
import size from "lodash/size";
import last from "lodash/last";
import { useParams } from "react-router";
import { useGetIssueQuery } from "../../generated/graphql";
import {
  Issue as IssueType,
  IssueCommentsList,
  Author as AuthorType,
} from "../../types/issues";
import MDEditor from "@uiw/react-md-editor";
import Author from "components/Author";
import mergeWith from "lodash/mergeWith";
import Breadcrumb from "components/Breadcrumb";

function Issue() {
  const { owner = "", repo = "", issueNumber = "" } = useParams();
  const { loading, data, fetchMore } = useGetIssueQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      repositoryName: repo,
      repositoryOwner: owner,
      number: Number(issueNumber),
    },
  });

  const issue: IssueType = data?.repositoryOwner?.repository?.issue;
  const comments: IssueCommentsList = issue?.comments.edges || [];
  const author: AuthorType = issue?.author;
  const cursor = last(comments)?.cursor;
  const totalCount = issue?.comments.totalCount || 0;
  const hasMore = size(comments) < totalCount;

  if (loading && !size(comments)) {
    return <Loading />;
  }

  return (
    <Box as="section">
      <Box mb="6">
        <Breadcrumb />
      </Box>

      <Box mb="6">
        <Author author={author} />
      </Box>

      <Heading fontSize={"2xl"} mb={6} textAlign="left">
        {capitalize(issue?.title)}
      </Heading>

      <Box mb={12} position="relative">
        <MDEditor.Markdown
          source={issue?.body || ""}
          style={{ textAlign: "left" }}
        />
      </Box>

      {size(comments) ? (
        <Box mb={6}>
          <Heading size="lg" textAlign="left" mb={3}>
            Comments
          </Heading>
          <Stack>
            {comments.map((item) => {
              return (
                item && <Comment key={item.node?.id} comment={item.node} />
              );
            })}
          </Stack>
        </Box>
      ) : null}

      {loading && (
        <Box mb="3">
          <Loading size="md" />
        </Box>
      )}

      {hasMore && (
        <Button
          mb="3"
          onClick={() => {
            fetchMore({
              variables: {
                after: cursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                return mergeWith({}, prev, fetchMoreResult, function (a, b) {
                  if (a instanceof Array) {
                    return a.concat(b);
                  }
                });
              },
            });
          }}
        >
          Load more
        </Button>
      )}

      <Card p={6} shadow="lg" border="1px" borderColor="blackAlpha.100">
        <NewCommentForm issueId={issue?.id || ""} />
      </Card>
    </Box>
  );
}

export default Issue;
