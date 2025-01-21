import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenreIdOrCategory } from "../../state-slices/movieFilters";
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import genreIcons from "../../assets/genres";
import useStyles from "./styles";

export default function GenreContainer({ genres, setMobileOpen }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { selectedGenreIdOrCategory } = useSelector(state => state.currentMovieFilter);
    useEffect(() => {
        setMobileOpen(false);
    }, [selectedGenreIdOrCategory]);

    return (
        <div>
            {genres.map(({ id, name }) => (
                <Link key={id} to="/" className={classes.links}>
                    {/* Dispatching genreId returns an Action object containing payload that can be read by the updater function */}
                    <ListItem onClick={() => dispatch(setGenreIdOrCategory(id))} button>
                        <ListItemIcon>
                            <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                </Link>
            ))}
        </div>
    );
}
