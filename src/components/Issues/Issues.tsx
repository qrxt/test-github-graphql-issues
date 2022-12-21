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
} from "@chakra-ui/react";
import React from "react";
import get from "lodash/get";
import capitalize from "lodash/capitalize";

export interface IssuesProps {
  isLoading: boolean;
  issues: any[]; // TODO! set actual type
}

function IssueItem({ issue }) {
  const title = get(issue, "node.title");
  const author = get(issue, "node.author.login");
  const link = get(issue, "node.url");

  return (
    <ListItem mb={3} w="100%">
      <Card alignItems="flex-start">
        <CardHeader py={3} textAlign="start">
          <Heading size="md">{capitalize(title)}</Heading>
        </CardHeader>

        <CardBody py={3} w="100%">
          <Flex justifyContent="space-between">
            <Link href="link" color="blue.300">
              [Link]
            </Link>
            <Text>By {author}</Text>
          </Flex>
        </CardBody>
      </Card>
    </ListItem>
  );
}

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
