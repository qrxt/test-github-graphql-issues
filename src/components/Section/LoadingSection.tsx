import { BoxProps, Center, Spinner } from "@chakra-ui/react";
import React from "react";
import Section from "./Section";

function LoadingSection(props: BoxProps) {
  return (
    <Section {...props}>
      <Center h="100%">
        <Spinner size="xl" color="purple.500" thickness="4px" />
      </Center>
    </Section>
  );
}

export default LoadingSection;
