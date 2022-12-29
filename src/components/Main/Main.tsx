import React from "react";
import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import { css } from "@emotion/react";

// TODO: heading
function Main({ children }: { children: React.ReactNode }) {
  const mainStyles = css`
    grid-area: main;
    flex-grow: 1;
  `;

  return (
    <Box as="main" css={mainStyles} p={[12, 20, 20]}>
      <Stack
        spacing={4}
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        px={0}
      >
        {/* <Heading fontSize={"2xl"}>Issues Manager</Heading> */}
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
}

export default Main;
