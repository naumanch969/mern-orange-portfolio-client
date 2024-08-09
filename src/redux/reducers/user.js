import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        error: null,
        users: [],
        currentUser: null,
        loggedUser: null
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        registerReducer: (state, action) => { state.users = [...state.users, action.payload] },
        loginReducer: (state, action) => { state.loggedUser = action.payload },
        logoutReducer: (state, action) => { state.loggedUser = null },
        getUsersReducer: (state, action) => { state.users = action.payload },
    }
})

export const { start, end, error, registerReducer, loginReducer, logoutReducer, getUsersReducer, } = userSlice.actions
export default userSlice.reducer