import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ToggleColorModeProvider from "./themes/ToggleColorMode";
import { Provider } from "react-redux";
import store from "./redux-store/store";
import router from "./routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ToggleColorModeProvider>
            <RouterProvider router={router} />
        </ToggleColorModeProvider>
    </Provider>
);
