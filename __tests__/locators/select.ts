import {
  findAllByTestId,
  fireEvent,
  getByTestId,
} from "@testing-library/react";
import find from "lodash/find";

export default function select(nodeElement: HTMLElement, testidPrefix: string) {
  return {
    nodeElement,
    wrapper() {
      return getByTestId(nodeElement, `${testidPrefix}-select`);
    },
    label() {
      return getByTestId(nodeElement, `${testidPrefix}-select-label`);
    },
    input() {
      return getByTestId(
        nodeElement,
        `${testidPrefix}-select-input`
      ) as HTMLSelectElement;
    },

    options() {
      const list: Promise<HTMLOptionElement[]> = findAllByTestId(
        nodeElement,
        `${testidPrefix}-select-option`
      );

      return list;
    },
    async selectedOption() {
      const options = await this.options();
      const selected = find(options, (option) => option.selected);

      return selected;
    },

    change(value: string) {
      fireEvent.change(this.wrapper(), { target: { value } });
    },
  };
}
