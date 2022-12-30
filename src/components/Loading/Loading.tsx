import React from "react";
import { Center, Spinner, SpinnerProps } from "@chakra-ui/react";

type LoadingProps = Pick<SpinnerProps, "size">;

export default function Loading(props: LoadingProps) {
  const { size = "xl" } = props;

  return (
    <Center h="100%">
      <Spinner size={size} color="purple.500" thickness="4px" />
    </Center>
  );
}
