/* eslint-disable no-multi-spaces */
import { createSlice } from "@reduxjs/toolkit";

// Consider userAuth as a slice of the Redux store consisting of state variables and a set of updater functions that modify them.

export const userAuth = createSlice({
    name: "userAuth",
    initialState: {
        user: undefined,
        isAuthenticated: false,
        sessionId: "",
    },
    reducers: {
        // set of updater functions that modify the inital states, when action is created and dispatched
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem("session_id");
        },
    },
});

export const { setUser } = userAuth.actions; // exports updater functions for use in components
export default userAuth.reducer; // pushes slice to the Redux store
