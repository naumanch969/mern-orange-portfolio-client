import * as api from "../../api/admin/about.js"
import {
    START_LOADING,
    END_LOADING,
    ERROR,
    GET_ABOUT_CONTENT,
    CREATE_ABOUT_FIRST_DOCUMENT,

    BUTTON,
    IMAGE,
    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,
    UPDATE_NAME,
    UPDATE_DOB,
    UPDATE_ADDRESS,
    UPDATE_PHONE,
    UPDATE_EMAIL,
    UPDATE_SUB_TEXT,
    DELETE_SECTION
} from "../../constants/admin/index"


export const getAboutContent = () => async (dispatch) => {
    try {

        // dispatch({ type: START_LOADING })

        const { data } = await api.getAboutContent()
        dispatch({ type: GET_ABOUT_CONTENT, payload: data })

        // dispatch({ type: END_LOADING })

    } catch (error) {
        // dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createAboutFirstDocument = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.createAboutFirstDocument()
        dispatch({ type: CREATE_ABOUT_FIRST_DOCUMENT, payload: data })

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
export const updateName = (name) => async (dispatch) => {
    try {
        const { data } = await api.updateName(name)
        dispatch({ type: UPDATE_NAME, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateDOB = (DOB) => async (dispatch) => {
    try {
        const { data } = await api.updateDOB(DOB)
        dispatch({ type: UPDATE_DOB, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateAddress = (address) => async (dispatch) => {
    try {
        const { data } = await api.updateAddress(address)
        dispatch({ type: UPDATE_ADDRESS, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updatePhone = (phone) => async (dispatch) => {
    try {
        const { data } = await api.updatePhone(phone)
        dispatch({ type: UPDATE_PHONE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateEmail = (email) => async (dispatch) => {
    try {
        const { data } = await api.updateEmail(email)
        dispatch({ type: UPDATE_EMAIL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateSubText = (subText) => async (dispatch) => {
    try {
        const { data } = await api.updateSubText(subText)
        dispatch({ type: UPDATE_SUB_TEXT, payload: data })
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
export const updateButton = (buttonId, button) => async (dispatch) => {        // {text, variant}
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







export const deleteAboutCollection = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.deleteAboutCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
