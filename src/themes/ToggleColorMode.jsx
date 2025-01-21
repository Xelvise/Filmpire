/* eslint-disable react/jsx-no-constructed-context-values */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState, useEffect } from "react";

export const ColorModeContext = createContext();

export default function ToggleColorModeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        // Retrieve the mode from localStorage or default to "dark"
        const savedMode = localStorage.getItem("theme");
        return savedMode || "dark";
    });

    // Save the mode to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("theme", mode);
    }, [mode]);

    // prettier-ignore
    const theme = useMemo(() => createTheme({
        palette: {
            mode
        }
    }), [mode]);

    const toggleColorMode = () => {
        setMode(initial => (initial === "light" ? "dark" : "light"));
    };

    return (
        <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
}
