"use client";

import React, { useState } from "react";

type Option = {
  name: string;
  value: string;
};

type DropdownSelectedProps = {
  options?: Option[];
  width?: string;
  onSelect: (value: string) => void; // Додано проп onSelect
  selectedValue: string; // Додано проп selectedValue
};

const DropdownSelected: React.FC<DropdownSelectedProps> = ({
  options = [],
  width = "100%",
  onSelect, // Отримуємо onSelect з пропсів
  selectedValue // Отримуємо selectedValue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (value: string) => {
    onSelect(value); // Викликаємо onSelect з переданим значенням
    setIsOpen(false); // Закриваємо дропдаун після вибору
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" style={{ width }}>
      <div
        onClick={toggleDropdown}
        className={`w-full text-left p-2 border ${
          isOpen
            ? "border-l border-r border-b border-black"
            : "border border-gray-300"
        } bg-white flex justify-between items-center cursor-pointer`}
      >
        <input
          type="text"
          placeholder={isOpen ? "Type to search..." : "Select departments"}
          value={selectedValue} // Відображаємо вибране значення
          readOnly
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
              onClick={() => handleOptionSelect(option.value)} // Виклик для вибору опції
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelected;
