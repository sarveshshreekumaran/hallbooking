// import logo from './logo.svg';
// import './App.css';
import React from "react";
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
import { AuthProvider } from "./context/AuthProvider";

function App() {
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
          element: <AdminSignUp />,
        },
        {
          path: "admin/signin",
          element: <AdminSignIn />,
        },
        {
          path: "user/signup",
          element: <UserSignUp />,
        },
        {
          path: "user/signin",
          element: <UserSignIn />,
        },
        {
          path: "hall/:id",
          element: (
            <ProtectedRoute>
              <FullCalendar />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
