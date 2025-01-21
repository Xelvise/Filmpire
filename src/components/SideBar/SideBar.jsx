import { useDispatch, useSelector } from "react-redux";
import { setGenreIdOrCategory } from "../../state-slices/movieFilters";
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./styles";
import { useFetchGenresQuery } from "../../services/TMDB";
import genreIcons, { genres } from "../../assets/genres";
import { GenreContainer } from "..";
import { useEffect } from "react";

export const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
];

export default function SideBar({ setMobileOpen }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();

    const { selectedGenreIdOrCategory } = useSelector(state => state.currentMovieFilter);
    const { data, error, isFetching } = useFetchGenresQuery();

    useEffect(() => {
        setMobileOpen(false);
    }, [selectedGenreIdOrCategory]);

    return (
        <>
            <Link to="/" className={classes.imageLink}>
                <img
                    src={theme.palette.mode === "light" ? "/blue-filmpire.png" : "/red-filmpire.png"}
                    alt="Filmpire logo"
                    className={classes.image}
                />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories.map(({ label, value }) => (
                    <Link key={value} to="/" className={classes.links}>
                        {/* Dispatching category value returns an Action object containing payload that can be read by the updater function */}
                        <ListItem onClick={() => dispatch(setGenreIdOrCategory(value))} button>
                            <ListItemIcon>
                                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List className={classes.list}>
                <ListSubheader>Genres</ListSubheader>
                {error && <GenreContainer genres={genres} setMobileOpen={setMobileOpen} />}
                {isFetching && <GenreContainer genres={genres} setMobileOpen={setMobileOpen} />}
                {data && <GenreContainer genres={data.genres} setMobileOpen={setMobileOpen} />}
            </List>
        </>
    );
}
