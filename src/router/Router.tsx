import React from "react";
import "./router.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  // Objects
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return <RouterProvider router={router} />;
};

export default Router;
