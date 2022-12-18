import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";

function Main({ children }: { children: React.ReactNode }) {
  const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const mainStyles = css`
    grid-area: main;
    flex-grow: 1;
  `;

  return (
    <Box as="main" css={mainStyles} bg={bg} p={6}>
      {children}
    </Box>
  );
}

export default Main;
