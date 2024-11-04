// src/components/Input.tsx
"use client";

import React from "react";

type InputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string; 
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  width = "100%"
}) => {
  return (
    <div className="mb-4" style={{ width }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-grey-500 p-2  focus:outline-none focus:ring-2 focus:ring-grey-500 w-full"
      />
    </div>
  );
};

export default Input;
