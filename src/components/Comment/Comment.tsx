import React from "react";
import { Box, Card, CardHeader } from "@chakra-ui/react";
import { IssueCommentNode, Author as AuthorType } from "../../types/issues";
import Author from "components/Author";
import MDEditor from "@uiw/react-md-editor";

interface CommentProps {
  comment: IssueCommentNode;
}

function Comment(props: CommentProps) {
  const { comment } = props;
  const author: AuthorType = comment?.author;

  return (
    <Card p={6} shadow="lg" border="1px" borderColor="blackAlpha.100">
      <CardHeader p="0" mb="6">
        <Author author={author} />
      </CardHeader>
      <Box mb={6} position="relative">
        <MDEditor.Markdown
          source={comment?.body || ""}
          style={{ textAlign: "left" }}
        />
      </Box>
    </Card>
  );
}

export default Comment;
