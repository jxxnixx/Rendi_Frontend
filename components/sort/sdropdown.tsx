import React, { useState } from "react";

interface SDropdownProps<T extends string | number> {
  options: { label: string; value: T }[];
  onSelect: (selectedOrder: T | T[]) => void;
  defaultValue?: T;
  multiSelect?: boolean;
}

export default function SDropdown<T extends string | number>({
  options,
  onSelect,
  defaultValue,
  multiSelect = false,
}: SDropdownProps<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>(
    multiSelect ? [] : [defaultValue || ("" as T)]
  );
  const [isOpened, setOpened] = useState(false);

  const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions: T[] = Array.from(event.target.selectedOptions).map(
      (option) => option.value as T
    );
    setSelectedItems(selectedOptions);
    onSelect(multiSelect ? selectedOptions : selectedOptions[0]);
  };

  // const selectedStyles = {
  //   color: "#FC345A", // 선택된 옵션의 글자 색
  // };

  return (
    <select
      size={1}
      value={multiSelect ? undefined : selectedItems[0]}
      onChange={handleOptionSelect}
      multiple={multiSelect}
    >
      {options.map((option) => (
        <option
          key={option.value.toString()}
          value={option.value}
          // style={selectedItems.includes(option.value) ? selectedStyles : undefined}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
