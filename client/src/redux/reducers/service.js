import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        isFetching: false,
        error: null,
        services: [],
        currentService: null
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        getServicesReducer: (state, action) => { state.services = action.payload },
        createServiceReducer: (state, action) => { state.services = [action.payload, ...state.services] },
        updateServiceReducer: (state, action) => { state.services = state.services.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteServiceReducer: (state, action) => { state.services = state.services.filter(s => s._id != action.payload._id) },
    }
})

export const { start, end, error, getServicesReducer, createServiceReducer, updateServiceReducer, deleteServiceReducer, } = serviceSlice.actions
export default serviceSlice.reducer