import { Box, Heading, Stack } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import Loading from "components/Loading";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useGetIssueQuery } from "../../generated/graphql";

const issueBodyStyles = css`
  text-align: left;
  .chakra-heading {
    font-size: 1.1rem;
  }
`;

function Issue() {
  const { owner = "", repo = "", issueNumber = "" } = useParams();
  const { loading, data } = useGetIssueQuery({
    variables: {
      repositoryName: owner,
      repositoryOwner: repo,
      number: Number(issueNumber),
    },
  });

  const issue = data?.repositoryOwner?.repository?.issue;
  const comments = issue?.comments.edges || [];

  console.log("$", comments);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box as="section">
      <Heading fontSize={"xl"} mb={6}>
        {issue?.title}
      </Heading>

      <Box mb={6} position="relative">
        <ReactMarkdown
          components={ChakraUIRenderer()}
          skipHtml
          css={issueBodyStyles}
        >
          {issue?.body || ""}
        </ReactMarkdown>
      </Box>

      {/* <Stack>
        {comments.map((item) => {
          return <p key={item?.node?.id}>{item?.node?.author?.login}</p>;
        })}
      </Stack> */}
    </Box>
  );
}

export default Issue;
