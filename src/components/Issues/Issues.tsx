import React from "react";
import {
  Box,
  List,
  ListItem,
  Text,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Link,
  Image,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import get from "lodash/get";
import capitalize from "lodash/capitalize";
import truncate from "lodash/truncate";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { css } from "@emotion/react";
import { size } from "lodash";

export interface IssuesProps {
  isLoading: boolean;
  issues: any[]; // TODO! set actual type
}

const issueBodyStyles = css`
  text-align: left;
  .chakra-heading {
    font-size: 1.1rem;
  }
`;

function ShadowGradient() {
  const shadowGradientStyles = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    width: 100%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(40, 40, 40, 0) 50%,
      rgba(255, 255, 255, 1) 100%
    );

    /* outline: 1px solid red; */
  `;

  return <div css={shadowGradientStyles}></div>;
}

// TODO! add actual types
// TODO: link to /issue
function IssueItem({ issue }) {
  const title = get(issue, "node.title");
  const author = get(issue, "node.author");
  const body = get(issue, "node.body");
  const link = get(issue, "node.url");

  const truncatedBody = truncate(body, { length: 300 });

  return (
    <ListItem mb={3} w="100%">
      <Card alignItems="flex-start">
        <CardHeader py={3} textAlign="start">
          <Link href="#" color="blue.300">
            <Heading size="md">{capitalize(title)}</Heading>
          </Link>
        </CardHeader>

        <CardBody py={3} w="100%">
          <Box mb={6} position="relative">
            <ReactMarkdown
              components={ChakraUIRenderer(body)}
              skipHtml
              css={issueBodyStyles}
            >
              {truncatedBody}
            </ReactMarkdown>
            {size(body) > size(truncatedBody) ? <ShadowGradient /> : null}
          </Box>
          <Flex justifyContent="space-between" alignItems="flex-end" w="100%">
            <Link href={link} color="blue.300">
              Open on GitHub
            </Link>
            <Flex alignItems="center">
              <Link href={author.url}>
                <Image src={author.avatarUrl} w="12" h="12" mr={3} />
              </Link>
              <Link href={author.url}>{author.login}</Link>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </ListItem>
  );
}

// TODO: no data placeholder
// TODO: loading indicator
// TODO: error placeholder
function Issues(props: IssuesProps) {
  const { isLoading, issues } = props;
  console.log(issues);

  if (!issues) {
    return <p>no data</p>;
  }

  return (
    <Box data-testid="Issues">
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <List display="flex" flexWrap="wrap">
          {issues.map((issue) => {
            const title = get(issue, "node.title");

            return <IssueItem key={title} issue={issue} />;
          })}
        </List>
      )}
    </Box>
  );
}

export default Issues;
