import React from "react";
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
  Button,
} from "@chakra-ui/react";
import Loading from "components/Loading";
import capitalize from "lodash/capitalize";
import size from "lodash/size";
import { useParams } from "react-router";
import {
  AddCommentMutationFn,
  useAddCommentMutation,
  useGetIssueQuery,
} from "../../generated/graphql";
import {
  Issue as IssueType,
  IssueCommentNode,
  IssueCommentsList,
  Author as AuthorType,
} from "../../types/issues";
import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm, useFormState } from "react-hook-form";

interface CommentProps {
  comment: IssueCommentNode;
}

function Author({ author }: { author: AuthorType }) {
  return (
    <Link href={author?.url} color="blue.300" fontWeight="medium">
      <Flex alignItems="center">
        <Image src={author?.avatarUrl} w="12" h="12" mr={[1, 1, 3]} />
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

type FormValues = {
  text: string;
};

function formSubmitHandler(issueId: string, addComment: AddCommentMutationFn) {
  return (formData: FormValues) => {
    addComment({
      variables: {
        issueId,
        commentBody: formData.text,
      },
    });
  };
}

function NewCommentForm({ issueId }: { issueId: string }) {
  const { control, handleSubmit, getValues } = useForm<FormValues>();
  const { isDirty } = useFormState<FormValues>({
    control,
  });
  const [addComment, { loading }] = useAddCommentMutation({
    refetchQueries: ["GetIssue"],
  });
  const submitHandler = handleSubmit(formSubmitHandler(issueId, addComment));
  const values = getValues();

  const isSubmitDisabled = !isDirty || !values.text || loading;

  return (
    <form onSubmit={submitHandler}>
      <Stack>
        <Box mb="3">
          <Controller
            rules={{ required: true }}
            name="text"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MDEditor
                textareaProps={{
                  disabled: loading,
                }}
                value={value}
                onChange={(something) => {
                  onChange(something);
                }}
              />
            )}
          />
        </Box>
        <Flex justifyContent="space-between">
          <Box>{loading && <Loading size="md" />}</Box>
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            alignSelf="flex-end"
          >
            Add comment
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}

// TODO: author name, avatar, link to github
// TODO: comment form
function Issue() {
  const { owner = "", repo = "", issueNumber = "" } = useParams();
  const { loading, data, error } = useGetIssueQuery({
    variables: {
      repositoryName: repo,
      repositoryOwner: owner,
      number: Number(issueNumber),
    },
  });

  const issue: IssueType = data?.repositoryOwner?.repository?.issue;
  const comments: IssueCommentsList = issue?.comments.edges || [];
  const author: AuthorType = issue?.author;

  if (loading) {
    return <Loading />;
  }

  console.log(error);

  return (
    <Box as="section">
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

      <Card p={6} shadow="lg" border="1px" borderColor="blackAlpha.100">
        <NewCommentForm issueId={issue?.id || ""} />
      </Card>
    </Box>
  );
}

export default Issue;
