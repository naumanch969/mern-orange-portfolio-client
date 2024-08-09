import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        isFetching: false,
        error: null,
        contactUsers: [],
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        getContactUsersReducer: (state, action) => { state.contactUsers = action.payload },
        formSubmitReducer: (state, action) => { },
    }
})

export const { start, end, error, getContactUsersReducer, formSubmitReducer, } = contactSlice.actions
export default contactSlice.reducer