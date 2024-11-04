// src/components/AppRoutes.tsx
"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "../../pages/users";
import EditUserPage from "../../pages/edit-user";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/edit-user" />} />
      <Route path="/edit-user" element={<EditUserPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
};

export default AppRoutes;
