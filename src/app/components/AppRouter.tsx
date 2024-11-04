// src/components/AppRouter.tsx
"use client";

import React from "react";
import { BrowserRouter } from "react-router-dom";

type AppRouterProps = {
  children: React.ReactNode;
};

const AppRouter: React.FC<AppRouterProps> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default AppRouter;
