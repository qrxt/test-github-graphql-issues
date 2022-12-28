import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h="100%">
      <Spinner size="xl" color="purple.500" thickness="4px" />
    </Center>
  );
}
