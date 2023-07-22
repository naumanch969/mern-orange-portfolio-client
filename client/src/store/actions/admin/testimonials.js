import * as api from "../../api/admin/testimonials.js"
import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_TESTIMONIALS_CONTENT,
    CREATE_TESTIMONIALS_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,
    ADD_TESTIMONIAL,
    UPDATE_TESTIMONIAL,
    DELETE_TESTIMONIAL,

    DELETE_SECTION
} from "../../constants/admin/index"

export const getTestimonialsContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getTestimonialsContent()
        dispatch({ type: GET_TESTIMONIALS_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createTestimonialsContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createTestimonialsContent()
        dispatch({ type: CREATE_TESTIMONIALS_FIRST_DOCUMENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const updateForwardHeading = (forwardHeading) => async (dispatch) => {
    try {
        const { data } = await api.updateForwardHeading(forwardHeading)
        dispatch({ type: UPDATE_FORWARD_HEADING, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateBackHeading = (backHeading) => async (dispatch) => {
    try {
        const { data } = await api.updateBackHeading(backHeading)
        dispatch({ type: UPDATE_BACK_HEADING, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateDetail = (detail) => async (dispatch) => {
    try {
        const { data } = await api.updateDetail(detail)
        dispatch({ type: UPDATE_DETAIL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const addTestimonial = (testimonialData) => async (dispatch) => {
    try {
        const { data } = await api.addTestimonial(testimonialData)
        dispatch({ type: ADD_TESTIMONIAL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateTestimonial = (testimonialId, testimonialData) => async (dispatch) => {
    try {
        const { data } = await api.updateTestimonial(testimonialId, testimonialData)
        dispatch({ type: UPDATE_TESTIMONIAL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteTestimonial = (testimonialId) => async (dispatch) => {
    try {
        const { data } = await api.deleteTestimonial(testimonialId)
        dispatch({ type: DELETE_TESTIMONIAL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const deleteTestimonialsCollection = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.deleteTestimonialsCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}