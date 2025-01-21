/* eslint-disable camelcase */
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";

export default function TopCasts({ credits, count = 6 }) {
    const classes = useStyles();
    return (
        // prettier-ignore
        <>
            {credits?.cast?.slice(0, count).map(
                ({ id, profile_path, name, character }) => profile_path && (
                    <Grid item key={id} xs={4} md={2} component={Link} to={`/actors/${id}`} style={{ textDecoration: "none" }}>
                        <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt={name} />
                        <Typography color="textPrimary">{name}</Typography>
                        <Typography color="textSecondary">{character.split("/")[0].trim()}</Typography>
                    </Grid>
                )
            )}
        </>
    );
}
