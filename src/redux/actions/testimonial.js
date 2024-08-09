import * as api from '../api'
import { start, end, error, getTestimonialsReducer, createTestimonialReducer, updateTestimonialReducer, deleteTestimonialReducer, } from '../reducers/testimonial'


export const getTestimonials = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getTestimonials()
        dispatch(getTestimonialsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createTestimonial = (testimonialData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createTestimonial(testimonialData)
        dispatch(createTestimonialReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateTestimonial = (testimonialId, testimonialData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateTestimonial(testimonialId, testimonialData)
        dispatch(updateTestimonialReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteTestimonial = (testimonialId, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteTestimonial(testimonialId)
        dispatch(deleteTestimonialReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}