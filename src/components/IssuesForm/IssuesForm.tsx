import React, { useState } from "react";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import Combobox from "components/Combobox/Combobox";
import { FieldValues, useForm, useFormState } from "react-hook-form";

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

function IssuesForm() {
  const { register, handleSubmit, control } = useForm<FieldValues>({
    defaultValues: {
      repo: "",
    },
  });
  const { isDirty } = useFormState<FieldValues>({
    control,
  });
  const [isRepoSelected, setIsRepoSelected] = useState(false);

  return (
    <Stack>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
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
    </Stack>
  );
}

export default IssuesForm;

// TODO: test that option selection is working
// TODO: test that submit button is disabled by default
// TODO: test that form is dirty after option select
