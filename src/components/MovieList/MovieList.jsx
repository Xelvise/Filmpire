/* eslint-disable import/no-cycle */
import { Grid } from "@mui/material";
import useStyles from "./styles";
import { Movie } from "..";

export default function MovieList({ data, count, excludeFirst }) {
    const classes = useStyles();
    const start = excludeFirst ? 1 : 0;
    return (
        // prettier-ignore
        <Grid container className={classes.moviesContainer}>
            {count
                ? data?.results.slice(start, count).map(
                    (movie, index) => <Movie key={movie.id} movie={movie} index={index} />
                )
                : data?.results.slice(start).map(
                    (movie, index) => <Movie key={movie.id} movie={movie} index={index} />
                )
            }
        </Grid>
    );
}
