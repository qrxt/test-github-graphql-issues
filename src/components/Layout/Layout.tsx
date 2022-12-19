import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Main from "components/Main";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxW={"3xl"} py={[3, 3, 3, 3]}>
      <Box
        border="1px"
        borderColor="blackAlpha.300"
        borderRadius="xl"
        boxShadow="lg"
      >
        <Main>{children}</Main>
      </Box>
    </Container>
  );
}

export default Layout;
