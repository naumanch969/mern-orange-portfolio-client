import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
    name: 'skill',
    initialState: {
        isFetching: false,
        error: null,
        skills: [],
        currentSkill: null
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        getSkillsReducer: (state, action) => { state.skills = action.payload },
        createSkillReducer: (state, action) => { state.skills = [action.payload, ...state.skills] },
        updateSkillReducer: (state, action) => { state.skills = state.skills.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteSkillReducer: (state, action) => { state.skills = state.skills.filter(s => s._id != action.payload._id) },
    }
})

export const { start, end, error, getSkillsReducer, createSkillReducer, updateSkillReducer, deleteSkillReducer, } = skillSlice.actions
export default skillSlice.reducer