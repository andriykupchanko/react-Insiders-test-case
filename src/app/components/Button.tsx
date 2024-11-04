// src/components/Button.tsx
import React from "react";

type ButtonProps = {
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
  width?: string; // Пропс для ширини кнопки, наприклад, "100%", "200px"
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  label,
  isActive = false,
  isDisabled = false,
  width,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{ width }}
      className={`p-2 text-center transition-colors ${
        isDisabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : isActive
          ? "bg-gray-400 text-black"
          : "bg-white text-black border border-gray-300 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
