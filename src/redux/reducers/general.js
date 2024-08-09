import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        isFetching: false,
        error: null,
        url: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        uploadImageReducer: (state, action) => { state.url = action.payload },
        deleteImageReducer: (state) => { state.url = null },
    }
})

export const { start, end, error, uploadImageReducer, deleteImageReducer } = generalSlice.actions
export default generalSlice.reducer