/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-boolean-value */
import { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetchMoviesQuery } from "../../services/TMDB";
import { MovieList, FeaturedMovie, Pagination } from "..";

export default function Movies() {
    const { selectedGenreIdOrCategory, searchQuery } = useSelector(state => state.currentMovieFilter);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isFetching } = useFetchMoviesQuery({ selectedGenreIdOrCategory, currentPage, searchQuery });

    const lg = useMediaQuery(theme => theme.breakpoints.only("lg"));
    const count = lg ? 17 : 19;

    if (error) {
        return <div>An error has occurred. Check your Internet connection</div>;
    }

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        );
    }

    if (data && data.results.length !== 0) {
        return (
            <>
                {!searchQuery && <FeaturedMovie movie={data.results[0]} />}
                <MovieList data={data} count={count} excludeFirst={true} />
                <Pagination currentPage={currentPage} totalPages={data.total_pages} updatePage={setCurrentPage} />
            </>
        );
    }

    return null;
}
