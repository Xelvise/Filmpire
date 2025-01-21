/* eslint-disable camelcase */
/* eslint-disable semi */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchActorsDetailsQuery, useFetchMoviesByActorIdQuery } from "../../services/TMDB";
import { MovieList, Pagination } from "..";
import { Box, Button, Grid, CircularProgress, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import useStyles from "./styles";

export default function Actors() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { id } = useParams();
    const [currentPage, setPage] = useState(1);

    const { data: actorInfo, isFetching: isFetchingInfo, error: errorFetchingInfo } = useFetchActorsDetailsQuery(id);
    const {
        data: starredMovies,
        isFetching: isFetchingMovies,
        error: errorFetchingMovies,
    } = useFetchMoviesByActorIdQuery({ id, currentPage });

    if (errorFetchingInfo) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
                    Something went wrong. Just go back and retry.
                </Button>
            </Box>
        );
    }

    if (isFetchingInfo) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        );
    }

    if (actorInfo && Object.keys(actorInfo).length !== 0) {
        const { profile_path, name, birthday, biography, imdb_id } = actorInfo;
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item lg={5} xl={4}>
                        <img
                            className={classes.image}
                            src={`https://image.tmdb.org/t/p/w780/${profile_path}`}
                            alt={name}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={7}
                        xl={8}
                        style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
                    >
                        <Typography variant="h2" gutterBottom>
                            {name}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Born:{" "}
                            {new Date(birthday).toLocaleDateString("en-US", {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                            })}
                        </Typography>
                        <Typography variant="body1" align="justify" paragraph>
                            {biography || "Sorry, no biography yet"}
                        </Typography>
                        <Box marginTop="2rem" display="flex" justifyContent="space-around">
                            <Button
                                variant="contained"
                                color="primary"
                                target="_blank"
                                href={`https://www.imdb.com/name/${imdb_id}`}
                            >
                                Visit IMDB Profile
                            </Button>
                            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">
                                Back
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Box margin="5rem 0">
                    <Typography variant="h4" align="center" marginBottom="2rem">
                        Here are movies {name.split(" ")[0]} starred in
                    </Typography>
                    {isFetchingMovies && <CircularProgress />}
                    {starredMovies && starredMovies.results.length !== 0 ? (
                        <>
                            <MovieList data={starredMovies} count={12} />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={starredMovies.total_pages}
                                updatePage={page => setPage(page)}
                            />
                        </>
                    ) : (
                        <Typography variant="subtitle2" align="center">
                            Surprisingly, {name} never starred in any movie
                        </Typography>
                    )}
                </Box>
            </>
        );
    }
}
