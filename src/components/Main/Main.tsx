import React from "react";
import { Box, Container, Stack } from "@chakra-ui/react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box as="main" p={["6", "12", "12"]}>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        px={0}
      >
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
}

export default Main;
