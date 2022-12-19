import { Box, Container, Heading, Stack } from "@chakra-ui/react";
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
        <IssuesForm />
      </Stack>
    </Box>
  );
}

export default IssuesPage;
