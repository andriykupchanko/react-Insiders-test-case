import React from "react";

type ButtonIconProps = {
  iconSrc: string; // Пропс для URL іконки
  isActive?: boolean;
  isDisabled?: boolean;
  width?: string; // Пропс для ширини кнопки, наприклад, "100%", "200px"
  onClick?: () => void;
  href?: string; // Пропс для URL посилання
};

const ButtonIcon: React.FC<ButtonIconProps> = ({
  iconSrc,
  isActive = false,
  isDisabled = false,
  width,
  onClick,
  href
}) => {
  const classes = `flex items-center justify-center p-2 transition-colors ${
    isDisabled
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : isActive
      ? "bg-gray-400 text-black"
      : "bg-white text-black border border-gray-300 hover:bg-gray-100"
  }`;

  const imageStyle = { width: "24px", height: "24px" };

  if (href) {
    return (
      <a
        href={isDisabled ? undefined : href}
        onClick={isDisabled ? undefined : onClick}
        style={{ width }}
        className={classes}
      >
        <img src={iconSrc} alt="icon" style={imageStyle} />
      </a>
    );
  }

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      style={{ width }}
      className={classes}
    >
      <img src={iconSrc} alt="icon" style={imageStyle} />
    </button>
  );
};

export default ButtonIcon;
