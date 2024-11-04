// src/components/SelectDropdown.tsx
"use client";

import React, { useState } from "react";

type Option = {
  name: string;
  value: string;
};

type SelectDropdownProps = {
  options: Option[];
  width?: string;
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  width = "100%"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false); // Закриваємо дропдаун після вибору
  };

  return (
    <div className="relative" style={{ width }}>
      <div
        onClick={toggleDropdown}
        className="w-full text-left p-2 border border-gray-300 bg-white flex justify-between items-center cursor-pointer"
      >
        <span>{selectedOption ? selectedOption.name : "Select an option"}</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{
            width: "0",
            height: "0",
            borderLeft: "4px solid transparent",
            borderRight: "4px solid transparent",
            borderTop: "4px solid black"
          }}
        ></span>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 shadow-lg max-h-48 overflow-y-auto mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => selectOption(option)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selectedOption?.value === option.value ? "bg-gray-200" : ""
              }`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
