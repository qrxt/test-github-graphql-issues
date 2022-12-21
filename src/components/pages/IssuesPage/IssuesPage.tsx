import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import Issues from "components/Issues";
import IssuesForm from "components/IssuesForm";
import React from "react";

function IssuesPage() {
  return (
    <Box p={6}>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        px={0}
      >
        <Heading fontSize={"2xl"}>Issues Manager</Heading>
        <Box>
          <IssuesForm />
        </Box>
      </Stack>
    </Box>
  );
}

export default IssuesPage;
