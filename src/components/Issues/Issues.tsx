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
  Button,
} from "@chakra-ui/react";
import { IssuesList, IssuesListItem } from "types/issues";
import { useGetLastIssuesQuery } from "../../generated/graphql";
import ShadowGradient from "components/ShadowGradient";
import { Link as RouterLink, generatePath, useParams } from "react-router-dom";
import Loading from "components/Loading";
import MDEditor from "@uiw/react-md-editor";
import mergeWith from "lodash/mergeWith";
import capitalize from "lodash/capitalize";
import truncate from "lodash/truncate";
import size from "lodash/size";
import first from "lodash/first";
import Breadcrumb from "components/Breadcrumb";

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
            <MDEditor.Markdown
              source={truncatedBody}
              style={{ textAlign: "left" }}
            />
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
  const { owner = "", repo = "" } = useParams();
  const { loading, data, fetchMore } = useGetLastIssuesQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      repositoryOwner: owner,
      repositoryName: repo,
    },
  });

  const issues: IssuesList =
    data?.repositoryOwner?.repository?.issues.edges || [];
  const cursor = first(issues)?.cursor;
  const totalCount = data?.repositoryOwner?.repository?.issues.totalCount || 0;
  const hasMore = size(issues) < totalCount;

  if (loading && !size(issues)) {
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
      <Box mb="6">
        <Breadcrumb />
      </Box>

      <List display="flex" flexWrap="wrap">
        {issues.map((issue) => {
          return (
            <IssueItem
              key={issue?.node?.id}
              issue={issue}
              repo={repo}
              owner={owner}
            />
          );
        })}
      </List>

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
                before: cursor,
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
    </Box>
  );
}

export default Issues;
