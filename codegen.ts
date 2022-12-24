import { CodegenConfig } from "@graphql-codegen/cli";
import schema from "./src/generated/github-schema-loader";

const config: CodegenConfig = {
  schema,
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
