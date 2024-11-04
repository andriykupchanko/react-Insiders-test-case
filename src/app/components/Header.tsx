// src/components/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <header className="p-4 border-b border-gray-300 flex justify-center items-center">
      <nav className="flex gap-4">
        <Link
          to="/edit-user"
          className={`px-4 py-2  ded ${
            activePage === "/edit-user"
              ? "bg-gray-300 text-white" // Активний стиль для "Edit Users"
              : "bg-white text-gray-600 border border-gray-300" // Нейтральний стиль
          } hover:bg-gray-200 transition`}
        >
          Edit Users
        </Link>
        <Link
          to="/users"
          className={`px-4 py-2  ded ${
            activePage === "/users"
              ? "bg-gray-300 text-white" // Активний стиль для "Users"
              : "bg-white text-gray-600 border border-gray-300" // Нейтральний стиль
          } hover:bg-gray-200 transition`}
        >
          Users
        </Link>
      </nav>
    </header>
  );
};

export default Header;
