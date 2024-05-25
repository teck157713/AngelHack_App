import { RouterProvider } from "react-router-dom";
// import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { router } from "./router";
import { theme } from "./theme";
// import { store } from "./store";
import FirebaseProvider from "./providers/firebase.provider";

export function App() {
    return (
        // <Provider store={store}>
            <FirebaseProvider>
                <ThemeProvider theme={ theme }>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </FirebaseProvider>
        // </Provider>
    )
}
