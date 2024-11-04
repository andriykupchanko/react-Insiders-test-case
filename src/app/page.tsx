// src/pages/index.tsx
import React from "react";
import AppRouter from "./components/AppRouter";
import AppRoutes from "./components/AppRoutes";
import Header from "./components/Header";

const HomePage: React.FC = () => {
  return (
    <AppRouter>
      <Header />
      <AppRoutes />
    </AppRouter>
  );
};

export default HomePage;
