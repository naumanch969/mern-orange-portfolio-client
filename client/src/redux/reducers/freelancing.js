import { createSlice } from "@reduxjs/toolkit";

const freelancingSlice = createSlice({
    name: 'freelancing',
    initialState: {
        isFetching: false,
        error: null,
        cards: [],
        currentFreelancing: null
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        getCardsReducer: (state, action) => { state.cards = action.payload },
        createCardReducer: (state, action) => { state.cards = [action.payload, ...state.cards] },
        updateCardReducer: (state, action) => { state.cards = state.cards.map(c => c = c._id == action.payload._id ? action.payload : c) },
        deleteCardReducer: (state, action) => { state.cards = state.cards.filter(c => c._id != action.payload._id) },
    }
})

export const { start, end, error, getCardsReducer, createCardReducer, updateCardReducer, deleteCardReducer, } = freelancingSlice.actions
export default freelancingSlice.reducer