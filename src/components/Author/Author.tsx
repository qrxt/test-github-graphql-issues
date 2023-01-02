import React from "react";
import { Text, Flex, Link, Image } from "@chakra-ui/react";
import { Author as AuthorType } from "../../types/issues";

function Author({ author }: { author: AuthorType }) {
  return (
    <Link href={author?.url} color="blue.300" fontWeight="medium">
      <Flex alignItems="center">
        <Image src={author?.avatarUrl} w="12" h="12" mr={[1, 1, 3]} />
        <Text>{author?.login}</Text>
      </Flex>
    </Link>
  );
}

export default Author;
