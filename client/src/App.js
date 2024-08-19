// import logo from './logo.svg';
// import './App.css';
import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Home from "./routes/Home";
import AdminSignUp from "./routes/AdminSignUp";
import AdminSignIn from "./routes/AdminSignIn";
import UserSignUp from "./routes/UserSignUp";
import UserSignIn from "./routes/UserSignIn";
import FullCalendar from "./routes/FullCalendar";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "admin/signup",
          element: <AdminSignUp setIsAuthenticated={setIsAuthenticated} />,
        },
        {
          path: "admin/signin",
          element: <AdminSignIn setIsAuthenticated={setIsAuthenticated} />,
        },
        {
          path: "user/signup",
          element: <UserSignUp setIsAuthenticated={setIsAuthenticated} />,
        },
        {
          path: "user/signin",
          element: <UserSignIn setIsAuthenticated={setIsAuthenticated} />,
        },
        {
          path: "hall/:id",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FullCalendar jwt={isAuthenticated} />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
