/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
/* eslint-disable semi */
import { useState, useEffect } from "react";
import { Typography, Grid, Box, CircularProgress, useMediaQuery, Rating } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGenreIdOrCategory } from "../../state-slices/movieFilters";
import { useFetchMovieQuery, useFetchRecommendationsQuery, useFetchListQuery } from "../../services/TMDB";
import { updateFavorites, updateWatchlist } from "../../auth/utils";
import genreIcons from "../../assets/genres";
import { MovieList, TopCasts, TrailerModal, NavBtns } from "..";
import useStyle from "./styles";

export default function MovieInfo() {
    const classes = useStyle();
    const isMobile = useMediaQuery("(max-width:600px)");
    const dispatch = useDispatch();

    const [isMovieFavorited, updateFavoriteState] = useState(false);
    const [isMovieWatchlisted, updateWatchlistState] = useState(false);
    const [open, setOpen] = useState(false);

    const { id: movieId } = useParams(); // grab movieId (given as path param) from current URL
    const { user } = useSelector(state => state.currentUser);
    const { data: movieData, isFetching: isFetchingMovie, error } = useFetchMovieQuery(movieId);

    const sessionId = localStorage.getItem("session_id");
    // prettier-ignore
    const { data: favoriteMovies } = user && sessionId ? useFetchListQuery({
        listType: "favorite",
        accountId: user.id,
        sessionId,
        page: 1,
    }) : { data: null };
    // prettier-ignore
    const { data: watchlistedMovies } = user && sessionId ? useFetchListQuery({
        listType: "watchlist",
        accountId: user.id,
        sessionId,
        page: 1,
    }) : { data: null };
    const { data: recommendations, isFetching: isFetchingRecommendations } = useFetchRecommendationsQuery(movieId);

    // These are executed as a side effect of updating movieData, favoriteMovies or watchlistedMovies
    useEffect(() => {
        // using "id", check if current movieData is present in favoriteMovies.results array (`!!` converts result to boolean)
        updateFavoriteState(!!favoriteMovies?.results?.find(movie => movie?.id === movieData?.id));
        // updates `isMovieFavorited` depending on if current movie has been enlisted
    }, [favoriteMovies, movieData]);
    useEffect(() => {
        // using "id", check if current movieData is present in watchlistedMovies.results array (`!!` converts result to boolean)
        updateWatchlistState(!!watchlistedMovies?.results?.find(movie => movie?.id === movieData?.id));
        // updates `isMovieWatchlisted` depending on if current movie has been added to watchlist
    }, [watchlistedMovies, movieData]);

    if (error) {
        return <Typography variant="h6">Something went wrong. Kindly reload page</Typography>;
    }
    if (isFetchingMovie) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        );
    }
    if (movieData && Object.keys(movieData).length !== 0) {
        // prettier-ignore
        const { title, videos, credits, homepage, genres, overview, poster_path, release_date, tagline, vote_average, runtime, spoken_languages, imdb_id } = movieData;

        return (
            <Grid container className={classes.containerSpaceAround}>
                {/* Render Movie poster */}
                <Grid item sm={12} lg={4} display="flex" justifyContent="center">
                    <img
                        className={classes.poster}
                        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/placeholder.webp"}
                        alt={title}
                    />
                </Grid>

                <Grid item container direction="column" lg={7}>
                    {/* Render Movie title and Tagline */}
                    <Typography variant={isMobile ? "h5" : "h3"} align="center" gutterBottom>
                        {title} ({release_date.split("-")[0]})
                    </Typography>
                    <Typography variant={isMobile ? "subtitle1" : "h5"} align="center" gutterBottom>
                        {tagline}
                    </Typography>

                    <Grid item className={classes.containerSpaceAround}>
                        {/* Render Movie ratings and score */}
                        <Box display="flex" alignItems="center">
                            <Rating readOnly value={vote_average / 2} />
                            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: "10px" }}>
                                {vote_average} / 10
                            </Typography>
                        </Box>
                        {/* Render Movie duration and language */}
                        <Typography variant={isMobile ? "subtitle1" : "h6"} align="center" gutterBottom>
                            {runtime}min {spoken_languages?.length > 0 ? `| ${spoken_languages[0]?.name}` : ""}
                        </Typography>
                    </Grid>

                    {/* Render list of genres and thier respective icons */}
                    <Grid item className={classes.genresContainer}>
                        {/* Dispatching genreId returns an Action object containing payload that can be read by the updater function */}
                        {genres?.map(({ id, name }, index) => (
                            <Link
                                key={index}
                                className={classes.links}
                                to="/"
                                onClick={() => dispatch(setGenreIdOrCategory(id))}
                            >
                                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
                                <Typography variant="subtitle1" color="textPrimary">
                                    {name}
                                </Typography>
                            </Link>
                        ))}
                    </Grid>

                    {/* Render Movie Overview */}
                    <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
                        Overview
                    </Typography>
                    <Typography style={{ marginBottom: "2rem" }}>{overview}</Typography>

                    {/* Render Top casts of the movie */}
                    <Typography variant="h5" gutterBottom>
                        Top Cast
                    </Typography>
                    <Grid item container spacing={2}>
                        <TopCasts credits={credits} count={6} />
                    </Grid>

                    {/* Buttons section */}
                    <NavBtns
                        trailerUpdaterFn={openState => setOpen(openState)}
                        websiteLink={homepage}
                        imdb_id={imdb_id}
                        // prettier-ignore
                        onClickFavorite={() =>
                            updateFavorites(user?.id, movieId, isMovieFavorited, updateFavoriteState)}
                        // prettier-ignore
                        onClickWatchlist={() =>
                            updateWatchlist(user?.id, movieId, isMovieWatchlisted, updateWatchlistState)}
                        isMovieFavorited={isMovieFavorited}
                        isMovieWatchlisted={isMovieWatchlisted}
                    />
                </Grid>

                {/* Render Movie recommendations */}
                <Box marginTop="5rem" width="100%">
                    {isFetchingRecommendations && (
                        <>
                            <Typography variant="h3" gutterBottom align="center">
                                You might also like
                            </Typography>
                            <CircularProgress />
                        </>
                    )}
                    {recommendations?.results.length !== 0 && (
                        <>
                            <Typography variant="h3" gutterBottom align="center">
                                You might also like
                            </Typography>
                            <MovieList data={recommendations} count={12} />
                        </>
                    )}
                </Box>

                {videos?.results.length !== 0 && (
                    <TrailerModal
                        videoKey={videos.results[0].key}
                        openState={open}
                        updaterFn={openState => setOpen(openState)}
                    />
                )}
            </Grid>
        );
    }
}
