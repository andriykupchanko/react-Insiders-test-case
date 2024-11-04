// src/components/DropdownSelected.tsx
"use client";

import React, { useState } from "react";
import DropdownElement from "./DropdownElement";

type Option = {
  id: number;
  label: string;
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
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleOption = (id: number) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((optionId) => optionId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
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
            <DropdownElement
              key={option.id}
              label={option.label}
              isSelected={selectedOptions.includes(option.id)}
              onToggle={() => toggleOption(option.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelected;
