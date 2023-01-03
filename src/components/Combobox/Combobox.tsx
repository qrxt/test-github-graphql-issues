import React, { useState } from "react";
import { useCombobox } from "downshift";
import {
  Flex,
  Input,
  List,
  ListItem,
  Popover,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import {
  RefCallBack,
  SubmitHandler,
  UseFormRegisterReturn,
} from "react-hook-form";
import { size } from "lodash";

interface SelectOption {
  value: string;
  label: string;
}
interface ComboboxListProps {
  isOpen: boolean;
}

type ListRef = HTMLUListElement;

const ComboboxList = React.forwardRef<ListRef, ComboboxListProps>(
  ({ isOpen, ...props }, ref) => {
    return (
      <List display={isOpen ? "block" : "none"} py={2} {...props} ref={ref} />
    );
  }
);
ComboboxList.displayName = "ComboboxList";

type ListItemRef = HTMLLIElement;

interface ListItemProps {
  itemIndex: number;
  highlightedIndex: number;
}

const ComboboxItem = React.forwardRef<ListItemRef, ListItemProps>(
  ({ itemIndex, highlightedIndex, ...props }, ref) => {
    const isActive = itemIndex === highlightedIndex;

    return (
      <ListItem
        transition="background-color 220ms, color 220ms"
        bg={isActive ? "blackAlpha.100" : "white"}
        px={4}
        py={2}
        cursor="pointer"
        display="flex"
        {...props}
        ref={ref}
      />
    );
  }
);
ComboboxItem.displayName = "ComboboxItem";

const comboboxListStyles = css`
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
`;

type ComboOption = {
  value: string;
  label: string;
};

interface ComboboxInputProps {
  ref: RefCallBack;
  onChange: () => void;
}

interface ComboboxProps {
  selectedItem?: SelectOption | null;
  label?: string;
  items: ComboOption[];
  inputProps?: ComboboxInputProps;
  onChange: (val?: string) => void;
  submit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

function Combobox(props: ComboboxProps) {
  const { label, items: initialItems, inputProps, onChange, submit } = props;
  const [items, setItems] = useState<ComboOption[]>(initialItems);
  const {
    isOpen: _isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: items,
    itemToString: (item) => item?.label || "",
    onSelectedItemChange: ({ inputValue }) => {
      onChange(inputValue);
    },
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue) {
        setItems(initialItems);
      } else {
        setItems(
          items.filter((item) => {
            const { label } = item;
            return label.toLowerCase().includes(inputValue.toLowerCase());
          })
        );
      }
    },
  });

  const isOpen = _isOpen && size(items);
  return (
    <Stack>
      <Text
        as="label"
        fontSize="md"
        fontWeight="medium"
        {...getLabelProps()}
        alignSelf="flex-start"
      >
        {label}
      </Text>
      <Stack position="relative">
        <Flex alignItems="center">
          <Input
            placeholder="owner/repoName"
            flex="0 0 auto"
            {...getInputProps({
              ...inputProps,
              onKeyDown: (e) => {
                if (e.key === "Enter" && !size(items)) {
                  submit();
                }
              },
            })}
          />
        </Flex>
        <ComboboxList
          isOpen={isOpen}
          {...getMenuProps()}
          flex={1}
          overflowY="auto"
          mt={0}
          css={comboboxListStyles}
          bg="white"
          border="1px"
          borderColor="blackAlpha.300"
        >
          <Popover>
            {items.map((item, index) => (
              <ComboboxItem
                {...getItemProps({ item, index })}
                itemIndex={index}
                highlightedIndex={highlightedIndex}
                key={item.value}
              >
                {item.label}
              </ComboboxItem>
            ))}
          </Popover>
        </ComboboxList>
      </Stack>
    </Stack>
  );
}

export default Combobox;
