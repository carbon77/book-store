import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
})

// Actions
export const { setUser } = authSlice.actions

// Selectors
export const selectUser = (state) => state.auth.user

export default authSlice.reducer