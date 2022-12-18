import "@testing-library/jest-dom/extend-expect";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: () => {
      return null;
    },
  };
});

jest.mock("react-virtualized-auto-sizer", () => {
  const lib = jest.requireActual("react-virtualized-auto-sizer");

  return {
    ...lib,
    default: ({ children }) => children({ width: 100, height: 100 }),
  };
});
