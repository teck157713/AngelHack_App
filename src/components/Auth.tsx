import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Auth() {
    const location = useLocation();

    useEffect(() => {
        if (![
            "/signin",
            "/signup"
        ].includes(location.pathname)) {
            
        }
    }, [location]);

    return null;
}