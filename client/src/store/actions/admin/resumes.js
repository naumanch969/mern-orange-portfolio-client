import * as api from "../../api/admin/resumes.js"

import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_RESUMES_CONTENT,
    CREATE_RESUMES_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,

    ADD_RESUME,
    UPDATE_RESUME,
    DELETE_RESUME,

    BUTTON,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getResumesContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getResumesContent()
        dispatch({ type: GET_RESUMES_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createResumesFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createResumesFirstDocument()
        dispatch({ type: CREATE_RESUMES_FIRST_DOCUMENT, payload: data })

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



export const addResume = (resumeData) => async (dispatch) => {
    try {
        const { data } = await api.addResume(resumeData)
        dispatch({ type: ADD_RESUME, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateResume = (resumeId, resumeData) => async (dispatch) => {
    try {
        const { data } = await api.updateResume(resumeId, resumeData)
        dispatch({ type: UPDATE_RESUME, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteResume = (resumeId) => async (dispatch) => {
    try {
        const { data } = await api.deleteResume(resumeId)
        dispatch({ type: DELETE_RESUME, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const addButton = (text, variant) => async (dispatch) => {
    try {
        const { data } = await api.addButton(text, variant)
        dispatch({ type: BUTTON, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateButton = (buttonId, button) => async (dispatch) => {
    try {
        const { data } = await api.updateButton(buttonId, button)
        dispatch({ type: BUTTON, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteButton = (buttonId) => async (dispatch) => {
    try {
        const { data } = await api.deleteButton(buttonId)
        dispatch({ type: BUTTON, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const deleteResumesCollection = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.deleteResumesCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}