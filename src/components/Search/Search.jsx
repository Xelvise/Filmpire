import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchByEntry } from "../../state-slices/movieFilters";
import useStyles from "./styles";

export default function Search() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchString, setSearchString] = useState("");
    const { selectedGenreIdOrCategory } = useSelector(state => state.currentMovieFilter);

    useEffect(() => {
        // clear Textfield, upon change in location or state variables
        if (location.pathname !== "/") setSearchString("");
    }, [location.pathname, selectedGenreIdOrCategory]);

    const handleKeyPress = event => {
        if (event.key === "Enter") {
            if (location.pathname !== "/") navigate("/");
            dispatch(searchByEntry(searchString)); // returns an Action object containing payload that can be read by same updater function
        }
    };

    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyPress={handleKeyPress}
                value={searchString}
                onChange={event => setSearchString(event.target.value)}
                variant="standard"
                InputProps={{
                    className: classes.input,
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}
