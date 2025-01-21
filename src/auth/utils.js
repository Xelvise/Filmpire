/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import axios from "axios";
import { setUser } from "../state-slices/userAuth";
const tmdbToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

export const tmdbAuthAPI = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${tmdbToken}`,
    },
});

export async function fetchToken() {
    try {
        const {
            data: { request_token },
        } = await tmdbAuthAPI.get("/authentication/token/new");

        if (request_token) {
            window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}/approved`;
            localStorage.setItem("unapproved_token", request_token);
        }
    } catch (error) {
        console.log("Sorry, your token could not be created.");
    }
}

export async function createSessionId(approvedToken) {
    try {
        const { data } = await tmdbAuthAPI.post("/authentication/session/new", {
            request_token: approvedToken,
        });
        localStorage.setItem("session_id", data.session_id);
        return data.session_id;
    } catch (error) {
        console.log(error);
    }
}

// since useDispatch hook can only be called from within a React functional component, the dispatchFn should be passed as a parameter to `loginUser`
export async function loginUser(dispatchFn) {
    const token = localStorage.getItem("approved_token");
    const sessionIdFromLocalStorage = localStorage.getItem("session_id");

    if (token) {
        try {
            if (!sessionIdFromLocalStorage) {
                // This gets executed first, because User has gotten approved token, but without a session id
                const sessionId = await createSessionId(token);
                const { data: userData } = await tmdbAuthAPI.get(`/account?session_id=${sessionId}`);
                dispatchFn(setUser(userData)); // returns an Action object containing payload that can be read by same updater function
            } else {
                // This gets executed on subsequent rechecks confirming that User has got a session id
                const { data: userData } = await tmdbAuthAPI.get(`/account?session_id=${sessionIdFromLocalStorage}`);
                dispatchFn(setUser(userData)); // returns an Action object containing payload that can be read by same updater function
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function logout() {
    localStorage.clear();
    window.location.href = "/";
}

export async function updateFavorites(accountId, movieId, isMovieFavorited, updateFavoriteState) {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId) {
        try {
            updateFavoriteState(initial => !initial);
            await tmdbAuthAPI.post(`/account/${accountId}/favorite?session_id=${sessionId}`, {
                media_type: "movie",
                media_id: movieId,
                favorite: !isMovieFavorited,
            });
        } catch (error) {
            updateFavoriteState(initial => !initial);
            console.error(error);
        }
    } else {
        console.log("You are not logged in");
    }
}

export async function updateWatchlist(accountId, movieId, isMovieWatchlisted, updateWatchlistState) {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId) {
        try {
            updateWatchlistState(initial => !initial);
            await tmdbAuthAPI.post(`/account/${accountId}/watchlist?session_id=${sessionId}`, {
                media_type: "movie",
                media_id: movieId,
                watchlist: !isMovieWatchlisted,
            });
        } catch (error) {
            updateWatchlistState(initial => !initial);
            console.error(error);
        }
    } else {
        console.log("You are not logged in");
    }
}
