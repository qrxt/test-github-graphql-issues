import React from "react";
import { Box, Flex, Stack, Button } from "@chakra-ui/react";
import {
  AddCommentMutationFn,
  useAddCommentMutation,
} from "../../generated/graphql";
import { Controller, useForm, useFormState } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import Loading from "components/Loading";

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

export default NewCommentForm;
