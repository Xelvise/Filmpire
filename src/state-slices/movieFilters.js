/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
import { createSlice } from "@reduxjs/toolkit";

// Consider movieFilter as a slice of the Redux store consisting of state variables and a set of actions that modify them

export const movieFilter = createSlice({
    name: "movieFilter",
    initialState: {
        selectedGenreIdOrCategory: "",
        searchQuery: "",
    },
    reducers: {
        // set of updater functions that modify the inital states, when action is created and dispatched
        setGenreIdOrCategory: (state, action) => {
            state.selectedGenreIdOrCategory = action.payload;
            state.searchQuery = "";
        },
        searchByEntry: (state, action) => {
            state.searchQuery = action.payload;
            state.selectedGenreIdOrCategory = "";
        },
    },
});

export const { setGenreIdOrCategory, searchByEntry, navToPrev, navToNext, setTotalPages } = movieFilter.actions; // exports updater functions for use in components
export default movieFilter.reducer; // pushes slice to the Redux store
