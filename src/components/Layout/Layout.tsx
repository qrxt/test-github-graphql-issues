import React from "react";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
// import Header from "components/Header";
// import Sidebar from "components/Sidebar";
import Main from "components/Main";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxW={"5xl"} py={[3, 3, 3, 3]}>
      <Box border="1px" borderRadius="xl" boxShadow="lg">
        {/* <Sidebar />
        <Header /> */}
        <Main>{children}</Main>
      </Box>
    </Container>
  );
}

export default Layout;
