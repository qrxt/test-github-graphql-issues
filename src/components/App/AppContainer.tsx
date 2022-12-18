import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "lib/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

function AppContainer() {
  console.log("asd");

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Router>
    </ChakraProvider>
  );
}

export default AppContainer;
