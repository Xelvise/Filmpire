import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, useTheme } from "@mui/material";
import { Menu, AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchToken, loginUser } from "../../auth/utils";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext } from "../../themes/ToggleColorMode";
import { SideBar, Search } from "..";
import useStyles from "./styles";

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();
    const isMobile = useMediaQuery("(max-width:600px)");
    const theme = useTheme();

    const { toggleColorMode } = useContext(ColorModeContext);
    const dispatch = useDispatch();

    // Retrieve state variables from `currentUser` slice in Redux store
    const { isAuthenticated, user } = useSelector(state => state.currentUser);
    const photo = user?.avatar?.tmdb?.avatar_path;
    const token = localStorage.getItem("approved_token");

    // Function in useEffect hook is only called on first reload/mount of component or if token is updated
    useEffect(() => {
        // If token has been approved on Approval page (i.e, token !== null), then loginUser() is called
        if (token) loginUser(dispatch);
    }, [token]);
    // user && console.log(user);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            style={{ outline: "none" }}
                            onClick={() => setMobileOpen(prevState => !prevState)}
                            className={classes.menuButton}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Search />
                    <div>
                        {!isAuthenticated ? (
                            <Button color="inherit" onClick={fetchToken}>
                                {!isMobile && <>Login</>}
                                &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button
                                color="inherit"
                                component={Link}
                                to={`/profile/${user?.id}`}
                                className={classes.linkButtton}
                            >
                                {!isMobile && <>My Movies</>} &nbsp;
                                <Avatar
                                    style={{ width: 30, height: 30 }}
                                    alt="Profile"
                                    src={photo && `https://www.themoviedb.org/t/p/w64_and_h64_face${photo}`}
                                />
                            </Button>
                        )}
                        <IconButton color="inherit" onClick={toggleColorMode}>
                            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <div>
                <nav className={classes.drawer}>
                    {isMobile ? (
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={mobileOpen}
                            onClose={() => setMobileOpen(prevState => !prevState)}
                            classes={{ paper: classes.drawerPaper }}
                            ModalProps={{ keepMounted: true }}
                        >
                            <SideBar setMobileOpen={setMobileOpen} />
                        </Drawer>
                    ) : (
                        <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                            <SideBar setMobileOpen={setMobileOpen} />
                        </Drawer>
                    )}
                </nav>
            </div>
        </>
    );
}
