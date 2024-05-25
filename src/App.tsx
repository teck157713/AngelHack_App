import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { router } from "./router";
import { theme } from "./theme";
import { store } from "./store";
import { Auth } from "./components/Auth";

export function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={ theme }>
                <Auth />
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    )
}
