import { createSlice } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
    name: 'testimonial',
    initialState: {
        isFetching: false,
        error: null,
        testimonials: [],
        currentTestimonial: null
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        getTestimonialsReducer: (state, action) => { state.testimonials = action.payload },
        createTestimonialReducer: (state, action) => { state.testimonials = [action.payload, ...state.testimonials] },
        updateTestimonialReducer: (state, action) => { state.testimonials = state.testimonials.map(t => t = t._id == action.payload._id ? action.payload : t) },
        deleteTestimonialReducer: (state, action) => { state.testimonials = state.testimonials.filter(t => t._id != action.payload._id) },
    }
})

export const { start, end, error, getTestimonialsReducer, createTestimonialReducer, updateTestimonialReducer, deleteTestimonialReducer, } = testimonialSlice.actions
export default testimonialSlice.reducer