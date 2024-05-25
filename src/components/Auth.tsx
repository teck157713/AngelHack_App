import { Navigate, useLocation } from "react-router-dom";
import useFirebase from "../hooks/firebase.hook";

export function Auth({
    children
}: any) {
    const location = useLocation();
    const {
        user
    } = useFirebase();

    const unprotectedRoutes = [
        "/signin",
        "/signup"
    ];

    return !unprotectedRoutes.includes(location.pathname) && !user ? 
        <Navigate to="/signin" />
        :
        children
}