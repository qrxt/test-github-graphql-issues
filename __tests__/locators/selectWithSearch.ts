import { findByLabelText } from "@testing-library/react";
import selectEvent from "react-select-event";

export default function selectWithSearch(
  nodeElement: HTMLElement,
  labelText: string
) {
  return {
    nodeElement,
    select() {
      return findByLabelText(nodeElement, labelText);
    },

    async change(value: string | string[]) {
      await selectEvent.select(await this.select(), value);
    },
  };
}
