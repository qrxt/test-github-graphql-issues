import React, { useState } from "react";
import { useCombobox } from "downshift";
import { Flex, Input, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

type InputRef = HTMLInputElement;

const ComboboxInput = React.forwardRef<InputRef>(({ ...props }, ref) => {
  return <Input {...props} ref={ref} />;
});
ComboboxInput.displayName = "ComboboxInput";

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
`;

type ComboOption = {
  value: string;
  label: string;
};

interface ComboboxProps {
  selectedItem?: SelectOption | null;
  label?: string;
  items: ComboOption[];
  inputProps?: UseFormRegisterReturn;
  onSelectedItemChange?: () => void;
}

function Combobox(props: ComboboxProps) {
  const {
    label,
    items: initialItems,
    inputProps,
    onSelectedItemChange = () => null,
  } = props;
  const [items, setItems] = useState<ComboOption[]>(initialItems);
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: items,
    itemToString: (item) => item?.label || "",
    onSelectedItemChange: () => {
      onSelectedItemChange();
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
          <ComboboxInput
            {...getInputProps(inputProps)}
            placeholder="facebook/react"
            flex="0 0 auto"
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
          border="1px solid blackAlpha.300"
        >
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
        </ComboboxList>
      </Stack>
    </Stack>
  );
}

export default Combobox;
