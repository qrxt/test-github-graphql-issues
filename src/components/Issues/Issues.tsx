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
import { IssuesList, IssuesListItem } from "types/issues";
import { useGetLastIssuesQuery } from "../../generated/graphql";
import ShadowGradient from "components/ShadowGradient";
import {
  useSearchParams,
  Link as RouterLink,
  generatePath,
} from "react-router-dom";
import Loading from "components/Loading";

const issueBodyStyles = css`
  text-align: left;
  .chakra-heading {
    font-size: 1.1rem;
  }
`;

interface IssueItemProps {
  issue: IssuesListItem;
  repo: string;
  owner: string;
}

function IssueItem(props: IssueItemProps) {
  const { issue, repo, owner } = props;
  const title = issue?.node?.title || "";
  const author = issue?.node?.author;
  const body = issue?.node?.body || "";
  const link = issue?.node?.url || "";

  const truncatedBody = truncate(body, { length: 300 });

  console.log(owner, repo, issue?.node?.number);

  return (
    <ListItem mb={6} w="100%">
      <Card alignItems="flex-start">
        <CardHeader py={3} textAlign="start">
          <Link
            as={RouterLink}
            to={generatePath("/issue/:owner/:repo/:issueNumber", {
              owner,
              repo,
              issueNumber: String(issue?.node?.number) || "",
            })}
            color="blue.300"
          >
            <Heading size="md">{capitalize(title)}</Heading>
          </Link>
        </CardHeader>

        <CardBody py={3} w="100%">
          <Box mb={6} position="relative">
            <ReactMarkdown
              components={ChakraUIRenderer()}
              skipHtml
              css={issueBodyStyles}
            >
              {truncatedBody}
            </ReactMarkdown>
            {size(body) > size(truncatedBody) ? <ShadowGradient /> : null}
          </Box>
          <Flex
            justifyContent="space-between"
            alignItems="flex-end"
            w="100%"
            flexWrap="wrap"
          >
            <Link href={link} color="blue.300">
              Open on GitHub
            </Link>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDir={["column", "column", "row"]}
            >
              <Link href={author?.url}>
                <Image src={author?.avatarUrl} w="12" h="12" mr={[0, 0, 3]} />
              </Link>
              <Link href={author?.url}>{author?.login}</Link>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </ListItem>
  );
}

function Issues() {
  const [searchParams] = useSearchParams();
  const { repo, owner } = Object.fromEntries(searchParams);
  const { loading, data } = useGetLastIssuesQuery({
    variables: {
      repositoryName: repo,
      repositoryOwner: owner,
    },
  });

  const issues: IssuesList = data?.repositoryOwner?.repository?.issues.edges;

  if (loading) {
    return (
      <Box data-testid="Issues">
        <Loading />
      </Box>
    );
  }

  if (!issues) {
    return (
      <Box data-testid="Issues">
        <Text>Could not find such a repository</Text>
      </Box>
    );
  }

  if (!size(issues)) {
    return (
      <Box data-testid="Issues">
        <Text>Issues list is empty</Text>
      </Box>
    );
  }

  return (
    <Box data-testid="Issues">
      <List display="flex" flexWrap="wrap">
        {issues.map((issue) => {
          const title = get(issue, "node.title");

          return (
            <IssueItem key={title} issue={issue} repo={repo} owner={owner} />
          );
        })}
      </List>
    </Box>
  );
}

export default Issues;
