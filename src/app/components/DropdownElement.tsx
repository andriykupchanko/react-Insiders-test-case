// src/components/DropdownElement.tsx
"use client";

import React from "react";

type DropdownElementProps = {
  key: string; // Ensure the key is declared for React
  label: string; // The label to display
  isSelected: boolean; // Indicates if the option is selected
  onToggle: () => void; // Function to call on toggle
};

const DropdownElement: React.FC<DropdownElementProps> = ({
  label,
  isSelected,
  onToggle
}) => {
  return (
    <div
      onClick={onToggle} // Toggle the selection when clicked
      className={`p-2 cursor-pointer hover:bg-gray-100 ${
        isSelected ? "bg-gray-200" : ""
      }`}
    >
      <input type="checkbox" checked={isSelected} readOnly className="mr-2" />
      {label}
    </div>
  );
};

export default DropdownElement;
