import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
};

const theme = extendTheme(
  {
    config,
    breakpoints,
    styles: {
      global: {
        "html, body, #root": {
          height: "100%",
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "purple",
    components: ["IconButton", "Button"],
  })
);

export default theme;
