// src/pages/index.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

const AppRouter = dynamic(() => import("./components/AppRouter"), {
  ssr: false
});
const AppRoutes = dynamic(() => import("./components/AppRoutes"), {
  ssr: false
});
const Header = dynamic(() => import("./components/Header"), { ssr: false });

const HomePage: React.FC = () => {
  return (
    <AppRouter>
      <Header />
      <AppRoutes />
    </AppRouter>
  );
};

export default HomePage;
