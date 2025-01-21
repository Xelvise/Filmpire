/* eslint-disable camelcase */
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";

export default function Movie({ movie, index }) {
    const classes = useStyles();
    const { id, title, poster_path, vote_average } = movie;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
            <Grow in timeout={(index + 1) * 250}>
                <Link className={classes.links} to={`/movie/${id}`}>
                    <Tooltip disableTouchListener title={title}>
                        <img
                            alt={title}
                            className={classes.image}
                            src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/placeholder.webp"}
                        />
                    </Tooltip>
                    <Typography className={classes.title} variant="h5">
                        {title}
                    </Typography>
                    <Tooltip disableTouchListener title={`${vote_average}/10`}>
                        <div>
                            <Rating readOnly value={vote_average / 2} precision={0.1} />
                        </div>
                    </Tooltip>
                </Link>
            </Grow>
        </Grid>
    );
}
