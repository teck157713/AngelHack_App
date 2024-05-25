import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Auth } from "./components/Auth";
import { Onboarding } from "./pages/Onboarding";
import { Home } from "./pages/Home";
import { EditCard } from "./pages/EditCard";
import { PaymentSuccess } from "./pages/PaymentSuccess";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Auth>
                <Layout />
            </Auth>
        ),
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/card",
                element: <EditCard />
            },
            {
                path: "/card/:cardId",
                element: <EditCard />
            },
            {
                path: "/payment-success",
                element: <PaymentSuccess />
            }
        ]
    },
    {
        path: "/onboarding",
        element: <Onboarding />
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