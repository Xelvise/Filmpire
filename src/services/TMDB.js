/* eslint-disable no-console */
/* eslint-disable no-shadow */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/3",
        prepareHeaders: headers => headers.set("authorization", `Bearer ${tmdbToken}`),
        onError: error => console.error(error),
    }),

    endpoints: builder => ({
        // Get all popular Movies
        fetchMovies: builder.query({
            query: ({ selectedGenreIdOrCategory, currentPage, searchQuery }) => {
                // Get Movies by CategoryName
                if (selectedGenreIdOrCategory && typeof selectedGenreIdOrCategory === "string") {
                    return `movie/${selectedGenreIdOrCategory}?page=${currentPage}`;
                }
                // Get Movies by GenreId
                if (selectedGenreIdOrCategory && typeof selectedGenreIdOrCategory === "number") {
                    return `discover/movie?with_genres=${selectedGenreIdOrCategory}&page=${currentPage}`;
                }
                // Get Movies by Search
                if (searchQuery) {
                    return `search/movie?query=${searchQuery}&include_adult=true&page=${currentPage}`;
                }
                // Get all popular Movies
                return `/movie/popular?page=${currentPage}`;
            },
        }),

        // Get genres
        fetchGenres: builder.query({
            query: () => `/genre/movie/list`,
        }),

        // Get a single movie
        fetchMovie: builder.query({
            query: id => `/movie/${id}?append_to_response=videos,credits`, // retrieves similar videos and credits of selected movie
        }),

        // Get User Specific lists
        fetchRecommendations: builder.query({
            query: movieId => `/movie/${movieId}/recommendations`,
        }),

        // Get Actors details
        fetchActorsDetails: builder.query({
            query: id => `person/${id}`,
        }),

        fetchMoviesByActorId: builder.query({
            query: ({ id, currentPage }) => `/discover/movie?with_cast=${id}&page=${currentPage}`,
        }),

        fetchList: builder.query({
            // prettier-ignore
            query: ({ listType, accountId, sessionId, page }) => `/account/${accountId}/${listType}/movies?session_id=${sessionId}&page=${page}`,
        }),
    }),
});

export const {
    useFetchMoviesQuery,
    useFetchGenresQuery,
    useFetchMovieQuery,
    useFetchRecommendationsQuery,
    useFetchActorsDetailsQuery,
    useFetchMoviesByActorIdQuery,
    useFetchListQuery,
} = tmdbApi;
