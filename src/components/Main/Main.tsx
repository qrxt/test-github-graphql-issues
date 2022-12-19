import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";

function Main({ children }: { children: React.ReactNode }) {
  const mainStyles = css`
    grid-area: main;
    flex-grow: 1;
  `;

  return (
    <Box as="main" css={mainStyles} p={6} h={"80%"}>
      {children}
    </Box>
  );
}

export default Main;
