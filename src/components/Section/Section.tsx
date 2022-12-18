import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function Section(props: BoxProps) {
  const { children, ...otherProps } = props;

  const controlsBg = useColorModeValue("white", "whiteAlpha.200");

  return (
    <Box
      py={3}
      px={[3, 3, 6, 6]}
      borderRadius="xl"
      boxShadow="md"
      bg={controlsBg}
      {...otherProps}
    >
      {children}
    </Box>
  );
}

export default Section;
