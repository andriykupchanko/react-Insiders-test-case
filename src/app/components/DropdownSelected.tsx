"use client";

import React, { useState } from "react";
import DropdownElement from "./DropdownElement";

type Option = {
  name: string;
  value: string;
};

type DropdownSelectedProps = {
  options?: Option[];
  width?: string;
  selectedValues: string[]; // Expecting an array for multiple selections
  onSelect: (values: string[]) => void; // Expecting an array for multiple selections
};

const DropdownSelected: React.FC<DropdownSelectedProps> = ({
  options = [],
  width = "100%",
  selectedValues,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionSelect = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onSelect(newSelectedValues); // Call the provided onSelect function
  };

  return (
    <div className="relative" style={{ width }}>
      <div
        onClick={toggleDropdown}
        className={`w-full text-left p-2 border ${
          isOpen
            ? "border-l border-r border-b border-black"
            : "border border-gray-300"
        } bg-white flex justify-between items-center`}
      >
        <input
          type="text"
          placeholder={isOpen ? "Type to search..." : "Select options"}
          value={
            isOpen ? searchQuery : selectedValues.join(", ") || "Select options"
          }
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none placeholder-gray-500"
          onFocus={toggleDropdown}
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
        <div className="absolute z-10 w-full bg-white border border-black shadow-lg max-h-48 overflow-y-auto transition-all duration-300 ease-out">
          {filteredOptions.map((option) => (
            <DropdownElement
              key={option.value}
              label={option.name}
              isSelected={selectedValues.includes(option.value)}
              onToggle={() => handleOptionSelect(option.value)} // Use handleOptionSelect to select this option
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelected;
