import { findByTestId } from "@testing-library/react";

export default function checkbox(nodeElement: HTMLElement) {
  return {
    nodeElement,
    wrapper() {
      return findByTestId(nodeElement, "header-wrapper");
    },
    statusBar() {
      return findByTestId(nodeElement, "status-bar");
    },
  };
}
