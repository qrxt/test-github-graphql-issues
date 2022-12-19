import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import Combobox from "components/Combobox/Combobox";
import React from "react";

const testItems = [
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
  return (
    <Stack>
      <form>
        <Flex w={["100%", "100%", "65%"]}>
          <Box flexGrow={1} pr={3}>
            <Combobox label="Repo" items={testItems} />
          </Box>
          <Button alignSelf="flex-end" ml="auto">
            Submit
          </Button>
        </Flex>
      </form>
    </Stack>
  );
}

export default IssuesForm;
