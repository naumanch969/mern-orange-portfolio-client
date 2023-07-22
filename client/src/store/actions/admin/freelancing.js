import * as api from "../../api/admin/freelancing.js"

import {
    START_LOADING,
    END_LOADING,
    ERROR,


    GET_FREELANCING_CONTENT,
    CREATE_FREELANCING_FIRST_DOCUMENT,

    UPDATE_FREELANCING_HEADING,
    UPDATE_FREELANCING_DETAIL,

    BUTTON,

    ADD_FEATURE_CARD,
    UPDATE_FEATURE_CARD,
    DELETE_FEATURE_CARD,

    ADD_FREELANCING_CARD,
    UPDATE_FREELANCING_CARD_TITLE,
    UPDATE_FREELANCING_CARD_DETAIL,
    UPDATE_FREELANCING_CARD,

    ADD_SUB_FREELANCING_CARD,
    UPDATE_SUB_FREELANCING_CARD,
    DELETE_SUB_FREELANCING_CARD,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getFreelancingContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getFreelancingContent()
        dispatch({ type: GET_FREELANCING_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createFreelancingFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createFreelancingFirstDocument()
        dispatch({ type: CREATE_FREELANCING_FIRST_DOCUMENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const updateHeading = (heading) => async (dispatch) => {
    try {
        const { data } = await api.updateHeading(heading)
        dispatch({ type: UPDATE_FREELANCING_HEADING, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateDetail = (detail) => async (dispatch) => {
    try {
        const { data } = await api.updateDetail(detail)
        dispatch({ type: UPDATE_FREELANCING_DETAIL, payload: data })
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








export const addFeatureCard = (title, quantity) => async (dispatch) => {
    try {
        const { data } = await api.addFeatureCard(title, quantity)
        dispatch({ type: ADD_FEATURE_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateFeatureCard = (featureCardId, card) => async (dispatch) => { // {title, quantity}
    try {
        const { data } = await api.updateFeatureCard(featureCardId, card)
        dispatch({ type: UPDATE_FEATURE_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteFeatureCard = (featureCardId) => async (dispatch) => {
    try {
        const { data } = await api.deleteFeatureCard(featureCardId)
        dispatch({ type: DELETE_FEATURE_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}











export const addFreelancingCard = (title, cards, detail) => async (dispatch) => {
    try {
        const { data } = await api.addFreelancingCard(title, cards, detail)
        dispatch({ type: ADD_FREELANCING_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateFreelancingCardTitle = (freelancingCardId, title) => async (dispatch) => {
    try {
        const { data } = await api.updateFreelancingCardTitle(freelancingCardId, title)
        dispatch({ type: UPDATE_FREELANCING_CARD_TITLE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateFreelancingCardDetail = (freelancingCardId, detail) => async (dispatch) => {
    try {
        const { data } = await api.updateFreelancingCardDetail(freelancingCardId, detail)
        dispatch({ type: UPDATE_FREELANCING_CARD_DETAIL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteFreelancingCard = (freelancingCardId) => async (dispatch) => {
    try {
        const { data } = await api.deleteFreelancingCard(freelancingCardId)
        dispatch({ type: UPDATE_FREELANCING_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const addSubFreelancingCard = (freelancingCardId, freelancingSubCardData) => async (dispatch) => {
    try {
        const { data } = await api.addSubFreelancingCard(freelancingCardId, freelancingSubCardData)
        dispatch({ type: ADD_SUB_FREELANCING_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateSubFreelancingCard = (freelancingCardId, subCardId, freelancingSubCardData) => async (dispatch) => {
    try {
        const { data } = await api.updateSubFreelancingCard(freelancingCardId, subCardId, freelancingSubCardData)
        dispatch({ type: UPDATE_SUB_FREELANCING_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteSubFreelancingCard = (freelancingCardId, subCardId) => async (dispatch) => {
    try {
        const { data } = await api.deleteSubFreelancingCard(freelancingCardId, subCardId)
        dispatch({ type: DELETE_SUB_FREELANCING_CARD, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}











export const deleteFreelancingCollection = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.deleteFreelancingCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
