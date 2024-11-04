// src/components/Dropdown.tsx
"use client";

import React, { useState } from "react";

type Option = {
  name: string;
  value: string;
};

type DropdownProps = {
  options?: Option[]; // Робимо `options` необов'язковим для безпечної обробки
  width?: string;
  selectedValue: string;
  onSelect: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  width = "100%",
  selectedValue,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Перевірка, чи є вибраний елемент у списку опцій
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <div className="relative" style={{ width }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-2 border border-gray-300 bg-white flex justify-between items-center"
      >
        <span>{selectedOption ? selectedOption.name : "Select an option"}</span>
        <span className={`transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selectedValue === option.value ? "font-bold" : ""
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

export default Dropdown;
