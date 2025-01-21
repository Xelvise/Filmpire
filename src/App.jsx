/* eslint-disable import/named */
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import useStyles from "./styles";
import { NavBar } from "./components";

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar />
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
