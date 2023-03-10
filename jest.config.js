const config = {
  verbose: true,
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      babelConfig: true,
      isolatedModules: true,
    },
  },
  testEnvironment: "jest-environment-jsdom",
  extensionsToTreatAsEsm: [".jsx"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  moduleNameMapper: {
    "^__tests__/(.*)$": "<rootDir>/__tests__/$1",
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^messages/(.*)$": "<rootDir>/src/messages/$1",
    "^messages$": "<rootDir>/src/messages/index.ts",
    "^theme/(.*)$": "<rootDir>/src/theme/$1",

    "^types/(.*)$": "<rootDir>/src/types/$1",
    "^lib/(.*)$": "<rootDir>/src/lib/$1",

    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__tests__/mocks/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/__tests__/mocks/fileMock.ts",
  },
};

export default config;
