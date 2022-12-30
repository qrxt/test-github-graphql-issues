import {
  Text,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Link,
  Stack,
  Image,
  theme,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import Loading from "components/Loading";
import capitalize from "lodash/capitalize";
import size from "lodash/size";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useGetIssueQuery } from "../../generated/graphql";
import {
  Issue as IssueType,
  IssueCommentNode,
  IssueCommentsList,
  Author as AuthorType,
} from "../../types/issues";

const issueBodyStyles = css`
  text-align: left;
  .chakra-heading {
    font-size: 1.1rem;
  }

  .chakra-text > img {
    margin: 10px auto;
  }

  .chakra-code {
    overflow-wrap: initial;
    overflow-x: auto;

    vertical-align: bottom;
    padding: 0 2px;

    word-break: break-word;
    margin-bottom: 5px;
  }

  .chakra-link {
    color: ${theme.colors.blue[300]};
  }
`;

interface CommentProps {
  comment: IssueCommentNode;
}

function Author({ author }: { author: AuthorType }) {
  return (
    <Link href={author?.url} color="blue.300" fontWeight="medium">
      <Flex alignItems="center">
        <Image src={author?.avatarUrl} w="12" h="12" mr={[0, 0, 3]} />
        <Text>{author?.login}</Text>
      </Flex>
    </Link>
  );
}

// TODO: author name, avatar, link to github
function Comment(props: CommentProps) {
  const { comment } = props;
  const author: AuthorType = comment?.author;

  return (
    <Card p={6} shadow="lg">
      <CardHeader p="0" mb="6">
        <Author author={author} />
      </CardHeader>
      <Box mb={6} position="relative">
        <ReactMarkdown
          components={ChakraUIRenderer()}
          skipHtml
          css={issueBodyStyles}
        >
          {comment?.body || ""}
        </ReactMarkdown>
      </Box>
    </Card>
  );
}

// TODO: author name, avatar, link to github
// TODO: comment form
function Issue() {
  const { owner = "", repo = "", issueNumber = "" } = useParams();
  const { loading, data } = useGetIssueQuery({
    variables: {
      repositoryName: owner,
      repositoryOwner: repo,
      number: Number(issueNumber),
    },
  });

  const issue: IssueType = data?.repositoryOwner?.repository?.issue;
  const comments: IssueCommentsList = issue?.comments.edges || [];
  const author: AuthorType = issue?.author;

  if (loading) {
    return <Loading />;
  }

  return (
    <Box as="section">
      <Box mb="6">
        <Author author={author} />
      </Box>

      <Heading fontSize={"2xl"} mb={6} textAlign="left">
        {capitalize(issue?.title)}
      </Heading>

      <Box mb={12} position="relative">
        <ReactMarkdown
          components={ChakraUIRenderer({})}
          skipHtml
          css={issueBodyStyles}
        >
          {issue?.body || ""}
        </ReactMarkdown>
      </Box>

      {size(comments) ? (
        <Box>
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
    </Box>
  );
}

export default Issue;
