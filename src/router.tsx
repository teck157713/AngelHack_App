import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
        ]
    },
    {
        path: "/signin",
        element: <SignIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
])