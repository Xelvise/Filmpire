/* eslint-disable semi */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import { useFetchListQuery } from "../../services/TMDB";
import { RatedCards } from "..";
import ProfileHeader from "./ProfileHeader";
import { fetchToken } from "../../auth/utils";

export default function Profile() {
    // Retrieve state variables from `currentUser` slice in Redux store
    const { user } = useSelector(state => state.currentUser);

    const sessionId = localStorage.getItem("session_id");
    // Call fetchToken if sessionId is null
    useEffect(() => {
        if (sessionId === null) {
            fetchToken();
        }
    }, [user, sessionId]);

    // prettier-ignore
    const { data: favoriteMovies, isFetching: isFetchingFavorites, error: errorFetchingFavorites, refetch: refetchFavorites } = useFetchListQuery({
        listType: "favorite",
        accountId: user?.id,
        sessionId,
        page: 1,
    });
    // prettier-ignore
    const { data: watchlistedMovies, isFetching: isFetchingWatchlist, error: errorFetchingWatchlist, refetch: refetchWatchlisted } = useFetchListQuery({
        listType: "watchlist",
        accountId: user?.id,
        sessionId,
        page: 1,
    });

    useEffect(() => {
        // As soon as Profile component is mounted, Favorites and Watchlists are refetched
        refetchFavorites();
        refetchWatchlisted();
    }, []);

    if (errorFetchingFavorites || errorFetchingWatchlist) {
        return <Typography variant="h5">Something went wrong. Kindly reload page</Typography>;
    }
    if (isFetchingFavorites || isFetchingWatchlist) {
        return (
            <>
                <ProfileHeader />
                <CircularProgress />
            </>
        );
    }
    if (favoriteMovies && watchlistedMovies) {
        const { results: favoriteList } = favoriteMovies;
        const { results: watchList } = watchlistedMovies;

        return (
            <>
                <ProfileHeader />
                {/* Handling cases where favoriteList and watchList are both empty */}
                {favoriteList.length === 0 && watchList.length === 0 && (
                    <Typography variant="h5">Add movies to Favorites or Watchlist to see them here</Typography>
                )}

                {favoriteList.length === 0 && (
                    <Typography variant="h5" marginBottom="5rem">
                        No movies were added to Favorites
                    </Typography>
                )}
                {watchList.length === 0 && (
                    <Typography variant="h5" marginBottom="5rem">
                        No movies were added to Watchlist
                    </Typography>
                )}

                {favoriteList.length > 0 && <RatedCards title="My Favorites" data={favoriteList} />}
                {watchList.length > 0 && <RatedCards title="My Watchlists" data={watchList} />}
            </>
        );
    }
}
