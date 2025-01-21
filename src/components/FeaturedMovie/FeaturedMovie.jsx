/* eslint-disable no-shadow */
/* eslint-disable import/named */
/* eslint-disable camelcase */
import { useSelector } from "react-redux";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { categories } from "../SideBar/SideBar";
import { genres } from "../../assets/genres";
import useStyles from "./styles";
import getMovieHeadline from "./utils";

export default function FeaturedMovie({ movie }) {
    const classes = useStyles();
    const { selectedGenreIdOrCategory, searchQuery } = useSelector(state => state.currentMovieFilter);
    const headline = getMovieHeadline(selectedGenreIdOrCategory, searchQuery, genres, categories);

    if (!movie) return null;

    if (Object.keys(movie).length !== 0) {
        const { id, title, backdrop_path, overview } = movie;
        return (
            <Box component={Link} to={`/movie/${id}`} className={classes.featuredCardContainer}>
                <Card className={classes.card} classes={{ root: classes.cardRoot }}>
                    <CardMedia
                        media="picture"
                        alt={title}
                        image={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                        title={title}
                        className={classes.cardMedia}
                    />

                    <CardContent className={classes.movieHeadline} classes={{ root: classes.cardContentRoot }}>
                        {headline && (
                            <Typography variant="h4" gutterBottom>
                                {headline}
                            </Typography>
                        )}
                    </CardContent>

                    <Box padding="20px">
                        <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                            <Typography variant="h5" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="body2">{overview}</Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Box>
        );
    }
}
