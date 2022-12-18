import { Box, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Layout from "components/Layout";
import React from "react";

const layoutWrapperStyles = css`
  min-height: 100%;
`;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <Box
      css={layoutWrapperStyles}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minW={320}
    >
      <Layout>{children}</Layout>
    </Box>
  );
}

export default Page;
