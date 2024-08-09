import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        isFetching: false,
        error: null,
        resumes: [],
        currentResume: null
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        getResumesReducer: (state, action) => { state.resumes = action.payload },
        createResumeReducer: (state, action) => { state.resumes = [action.payload, ...state.resumes] },
        updateResumeReducer: (state, action) => { state.resumes = state.resumes.map(r => r = r._id == action.payload._id ? action.payload : r) },
        deleteResumeReducer: (state, action) => { state.resumes = state.resumes.filter(r => r._id != action.payload._id) },
    }
})

export const { start, end, error, getResumesReducer, createResumeReducer, updateResumeReducer, deleteResumeReducer, } = resumeSlice.actions
export default resumeSlice.reducer