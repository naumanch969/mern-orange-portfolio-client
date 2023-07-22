import * as api from "../../api/admin/home.js"

import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_HOME_CONTENT,
    CREATE_HOME_FIRST_DOCUMENT,

    UPDATE_HELLO_TEXT,
    UPDATE_HEADING_1,
    UPDATE_HEADING_2,
    UPDATE_SUB_HEADING_1,
    IMAGE,
    BUTTON,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getHomeContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getHomeContent()
        dispatch({ type: GET_HOME_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createHomeFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createHomeFirstDocument()
        dispatch({ type: CREATE_HOME_FIRST_DOCUMENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const updateHelloText = (helloText) => async (dispatch) => {
    try {
        const { data } = await api.updateHelloText(helloText)
        dispatch({ type: UPDATE_HELLO_TEXT, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateHeading1 = (heading1) => async (dispatch) => {
    try {
        const { data } = await api.updateHeading1(heading1)
        dispatch({ type: UPDATE_HEADING_1, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateHeading2 = (heading2) => async (dispatch) => {
    try {
        const { data } = await api.updateHeading2(heading2)
        dispatch({ type: UPDATE_HEADING_2, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateSubHeading1 = (subHeading1) => async (dispatch) => {
    try {
        const { data } = await api.updateSubHeading1(subHeading1)
        dispatch({ type: UPDATE_SUB_HEADING_1, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const addImage = (file, url) => async (dispatch) => {
    try {
        const { data } = await api.addImage(file, url)
        dispatch({ type: IMAGE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteImage = (imageId) => async (dispatch) => {
    try {
        const { data } = await api.deleteImage(imageId)
        dispatch({ type: IMAGE, payload: data })
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



export const deleteHomeCollection = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.deleteHomeCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}