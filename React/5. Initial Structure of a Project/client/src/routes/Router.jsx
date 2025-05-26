import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/about-us",
                Component: AboutUs
            },
            {
                path: "/contact-us",
                Component: ContactUs
            },
        ]
    },
    {
        path: "/*",
        Component: Error
    }
])