import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "lib/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import { ApolloProvider } from "@apollo/client";
import client from "apollo/client";

function AppContainer() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Router>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default AppContainer;
