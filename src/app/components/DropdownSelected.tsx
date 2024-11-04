// src/components/DropdownSelected.tsx
"use client";

import React, { useState } from "react";

type Option = {
  name: string;
  value: string;
};

type DropdownSelectedProps = {
  options?: Option[];
  width?: string;
};

const DropdownSelected: React.FC<DropdownSelectedProps> = ({
  options = [],
  width = "100%"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleOption = (value: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((optionValue) => optionValue !== value)
        : [...prevSelected, value]
    );
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" style={{ width }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-2 border ${
          isOpen
            ? "border-l border-r border-b border-black"
            : "border border-gray-300"
        } bg-white flex justify-between items-center cursor-pointer`}
      >
        <input
          type="text"
          placeholder={isOpen ? "Type to search..." : "Select departments"}
          value={isOpen ? searchQuery : ""}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none placeholder-gray-500"
          onFocus={() => setIsOpen(true)}
        />
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
        <div
          className="absolute z-10 w-full bg-white border border-black shadow-lg max-h-48 overflow-y-auto transition-all duration-300 ease-out"
          style={{
            borderTop: "none", // Прибираємо верхній бордер для злиття з полем вводу
            animation: "fadeIn 0.2s ease-in-out"
          }}
        >
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selectedOptions.includes(option.value) ? "bg-gray-200" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                readOnly
                className="mr-2"
              />
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelected;
