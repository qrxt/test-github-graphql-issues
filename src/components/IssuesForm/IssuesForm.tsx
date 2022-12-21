import React, { useState } from "react";
import { Box, Button, Flex, List, ListItem, Stack } from "@chakra-ui/react";
import Combobox from "components/Combobox/Combobox";
import { FieldValues, useForm, useFormState } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import Issues from "components/Issues/Issues";
import { GET_LAST_ISSUES } from "apollo/issues";
import get from "lodash/get";

const initialItems = [
  {
    value: "rails/rails",
    label: "rails/rails",
  },
  {
    value: "facebook/react",
    label: "facebook/react",
  },
];

type FormValues = {
  repo: string;
};

function IssuesForm() {
  const [getIssues, { loading, data, error }] = useLazyQuery(GET_LAST_ISSUES);
  const issues = get(data, "repositoryOwner.repository.issues.edges");
  console.log("$$", data, error);

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      repo: "",
    },
  });
  const { isDirty } = useFormState<FormValues>({
    control,
  });
  const [isRepoSelected, setIsRepoSelected] = useState(false);

  function formSubmitHandler(data: FormValues) {
    const { repo } = data;
    const [repoOwner, repoName] = repo.split("/");

    getIssues({
      variables: { repositoryOwner: repoOwner, repositoryName: repoName },
    });
  }

  return (
    <Stack>
      <Box mb={6}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Flex w={["100%", "100%", "65%"]}>
            <Box flexGrow={1} pr={3}>
              <Combobox
                label="Repo"
                items={initialItems}
                inputProps={register("repo")}
                onSelectedItemChange={() => {
                  setIsRepoSelected(true);
                }}
              />
            </Box>
            <Button
              alignSelf="flex-end"
              ml="auto"
              type="submit"
              disabled={!(isDirty || isRepoSelected)}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Box>

      <Issues isLoading={loading} issues={issues} />
    </Stack>
  );
}

export default IssuesForm;

// TODO: test that option selection is working
// TODO: test that submit button is disabled by default
// TODO: test that form is dirty after option select
