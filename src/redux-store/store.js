import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import movieFilterReducer from "../state-slices/movieFilters";
import userAuthReducer from "../state-slices/userAuth";

export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentMovieFilter: movieFilterReducer,
        currentUser: userAuthReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tmdbApi.middleware),
});
