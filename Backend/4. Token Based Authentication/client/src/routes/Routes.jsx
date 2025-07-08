import { createBrowserRouter } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../components/layout/MainLayout";
import Users from "../pages/Users";
import Quotes from "../pages/Quotes";
import Products from "../pages/Products";
import Posts from "../pages/Posts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        index: true,
        element: <PrivateRoutes><Home /></PrivateRoutes>
      },
      {
        path: "/users",
        element: <PrivateRoutes><Users /></PrivateRoutes>
      },
      {
        path: "/quotes",
        element: <PrivateRoutes><Quotes /></PrivateRoutes>
      },
      {
        path: "/products",
        element: <PrivateRoutes><Products /></PrivateRoutes>
      },
      {
        path: "/posts",
        element: <PrivateRoutes><Posts /></PrivateRoutes>
      }
    ],
  },
]);