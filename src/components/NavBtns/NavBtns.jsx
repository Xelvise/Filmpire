/* eslint-disable camelcase */
import { Grid, ButtonGroup, Button } from "@mui/material";
import {
    Language,
    Movie as MovieIcon,
    Theaters,
    FavoriteBorderOutlined,
    Favorite,
    Remove,
    PlusOne,
    ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useStyle from "./styles";

export default function NavBtns({
    websiteLink,
    imdb_id,
    trailerUpdaterFn,
    onClickFavorite,
    onClickWatchlist,
    isMovieFavorited,
    isMovieWatchlisted,
}) {
    const classes = useStyle();
    const navigate = useNavigate();

    return (
        <Grid item container style={{ marginTop: "2rem" }}>
            <div className={classes.buttonsContainer}>
                <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                    <ButtonGroup size="small" variant="outlined">
                        <Button target="_blank" rel="noopener noreferrer" href={websiteLink} endIcon={<Language />}>
                            Website
                        </Button>
                        <Button
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.imdb.com/title/${imdb_id}`}
                            endIcon={<MovieIcon />}
                        >
                            IMDB
                        </Button>
                        <Button onClick={() => trailerUpdaterFn(true)} endIcon={<Theaters />}>
                            Trailer
                        </Button>
                    </ButtonGroup>
                </Grid>

                <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                    <ButtonGroup size="medium" variant="outlined">
                        <Button
                            onClick={onClickFavorite}
                            endIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}
                        >
                            {isMovieFavorited ? "Unfavorite" : "Favorite"}
                        </Button>
                        <Button onClick={onClickWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                            {isMovieWatchlisted ? "Watchlisted" : "Watchlist"}
                        </Button>
                        <Button
                            endIcon={<ArrowBack />}
                            sx={{ borderColor: "primary.main" }}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </ButtonGroup>
                </Grid>
            </div>
        </Grid>
    );
}
