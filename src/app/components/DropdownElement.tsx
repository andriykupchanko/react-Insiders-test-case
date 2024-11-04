// src/components/DropdownElement.tsx
"use client";

import React from "react";

type DropdownElementProps = {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
};

const DropdownElement: React.FC<DropdownElementProps> = ({
  label,
  isSelected,
  onToggle
}) => {
  return (
    <div
      className={`flex items-center px-2 py-1 cursor-pointer ${
        isSelected ? "text-black" : "text-gray-700"
      }`}
      onClick={onToggle}
    >
      <div
        className={`w-5 h-5 mr-3 flex items-center justify-center border ${
          isSelected ? "bg-black text-white" : "bg-white border-gray-300"
        } rounded`}
      >
        {isSelected && <span className="text-xs">✓</span>}
      </div>
      <span>{label}</span>
    </div>
  );
};

export default DropdownElement;
