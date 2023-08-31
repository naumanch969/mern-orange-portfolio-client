import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        isFetching: false,
        error: null,
        projects: [],
        currentProject: null
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        getProjectsReducer: (state, action) => { state.projects = action.payload },
        createProjectReducer: (state, action) => { state.projects = [action.payload, ...state.projects] },
        updateProjectReducer: (state, action) => { state.projects = state.projects.map(p => p = p._id == action.payload._id ? action.payload : p) },
        deleteProjectReducer: (state, action) => { state.projects = state.projects.filter(p => p._id != action.payload._id) },
    }
})

export const { start, end, error, getProjectsReducer, createProjectReducer, uploadProjectImageReducer, updateProjectReducer, deleteProjectReducer, } = projectSlice.actions
export default projectSlice.reducer