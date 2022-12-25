import React, { useEffect } from "react";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import Combobox from "components/Combobox/Combobox";
import { Controller, useForm, useFormState } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import Issues from "components/Issues/Issues";
import { GET_LAST_ISSUES } from "apollo/issues";
import get from "lodash/get";
import size from "lodash/size";
import {
  GetLastIssuesDocument,
  GetLastIssuesQuery,
  GetLastIssuesQueryVariables,
  IssueNodeFieldsFragment,
} from "../../generated/graphql";
import { IssueConnection } from "@octokit/graphql-schema/schema";

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

// TODO: set static size
function IssuesForm() {
  const [getIssues, { loading, data, error }] = useLazyQuery<
    GetLastIssuesQuery,
    GetLastIssuesQueryVariables
  >(GetLastIssuesDocument);
  const issues: IssueNodeFieldsFragment[] | undefined = get(
    data,
    "repositoryOwner.repository.issues.edges"
  );

  const { handleSubmit, control, setFocus } = useForm<FormValues>({
    defaultValues: {
      repo: "",
    },
  });
  const { isDirty } = useFormState<FormValues>({
    control,
  });
  useEffect(() => {
    setFocus("repo");
  }, [setFocus]);

  function formSubmitHandler(formData: FormValues) {
    const { repo } = formData;
    const [repoOwner, repoName] = repo.split("/");

    getIssues({
      variables: { repositoryOwner: repoOwner, repositoryName: repoName },
    });
  }

  const submitHandler = handleSubmit(formSubmitHandler);
  return (
    <Stack>
      <Box mb={6}>
        <form onSubmit={submitHandler}>
          <Flex
            w={["100%", "100%", "65%"]}
            flexDir={["column", "row", "row"]}
            alignItems="center"
          >
            <Box flexGrow={1} mr={[0, 3, 3]} mb={[3, 0, 0]} w="100%">
              <Controller
                control={control}
                name="repo"
                render={({ field: { onChange, ref } }) => (
                  <Combobox
                    label="Repo"
                    items={initialItems}
                    inputProps={{ onChange, ref }}
                    onChange={onChange}
                    submit={submitHandler}
                  />
                )}
              />
            </Box>
            <Button
              alignSelf={["auto", "flex-end", "flex-end"]}
              ml={[null, "auto", "auto"]}
              w={["100%", "auto", "auto"]}
              type="submit"
              disabled={!isDirty}
            >
              Search
            </Button>
          </Flex>
        </form>
      </Box>

      {<Issues isLoading={loading} issues={issues} />}
    </Stack>
  );
}

export default IssuesForm;

// TODO: test that option selection is working
// TODO: test that submit button is disabled by default
// TODO: test that form is dirty after option select
