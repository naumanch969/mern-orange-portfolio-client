import * as api from "../../api/admin/contact.js"

import {
    START_LOADING,
    END_LOADING,
    ERROR,

    BUTTON,
    IMAGE,
    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,
    ADD_CONTACT_CARD,
    UPDATE_CONTACT_CARD,
    DELETE_CONTACT_CARD,

    GET_CONTACT_CONTENT,
    CREATE_CONTACT_FIRST_DOCUMENT,
    UPDATE_INPUTS,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getContactContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getContactContent()
        dispatch({ type: GET_CONTACT_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const createContactFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createContactFirstDocument()
        dispatch({ type: CREATE_CONTACT_FIRST_DOCUMENT, payload: data })

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
        dispatch({ type: END_LOADING })
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





export const addContactCard = (icon, title, detail) => async (dispatch) => {
    try {
        const { data } = await api.addContactCard(icon, title, detail)
        dispatch({ type: ADD_CONTACT_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateContactCard = (cardId, card) => async (dispatch) => {   //  {icon, title, detail}
    try {
        const { data } = await api.updateContactCard(cardId, card)
        dispatch({ type: UPDATE_CONTACT_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteContactCard = (cardId) => async (dispatch) => {
    try {
        const { data } = await api.deleteContactCard(cardId)
        dispatch({ type: DELETE_CONTACT_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}








export const addImage = (file, url) => async (dispatch) => {
    try {
        const { data } = await api.addContactImage(file, url)
        dispatch({ type: IMAGE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}


export const deleteImage = (imageId) => async (dispatch) => {
    try {
        const { data } = await api.deleteContactImage(imageId)
        dispatch({ type: IMAGE, payload: data })

    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const updateInputs = (inputData) => async (dispatch) => {
    try {
        const { data } = await api.updateInputs(inputData)
        dispatch({ type: UPDATE_INPUTS, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}











export const addButton = (text, variant) => async (dispatch) => {
    try {
        const { data } = await api.addContactButton(text, variant)
        dispatch({ type: BUTTON, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateButton = (buttonId, button) => async (dispatch) => {
    try {
        const { data } = await api.updateContactButton(buttonId, button)
        dispatch({ type: BUTTON, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteButton = (buttonId) => async (dispatch) => {
    try {
        const { data } = await api.deleteContactButton(buttonId)
        dispatch({ type: BUTTON, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const deleteContactCollection = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.deleteContactCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
