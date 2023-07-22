import * as api from "../../api/admin/navbar.js"

import {
    START_LOADING,
    END_LOADING,
    ERROR,


    GET_NAVBAR_CONTENT,
    CREATE_NAVBAR_FIRST_DOCUMENT,

    UPDATE_LOGO,
    ADD_NAV_LINK,
    UPDATE_NAV_LINK,
    UPDATE_NAV_LINK_NAME,
    UPDATE_NAV_LINK_LINK,
    DELETE_NAV_LINK,
    ADD_SOCIAL_MEDIA,
    UPDATE_SOCIAL_MEDIA_NAME,
    UPDATE_SOCIAL_MEDIA_LINK,
    DELETE_SOCIAL_MEDIA,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getNavbarContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getNavbarContent()
        dispatch({ type: GET_NAVBAR_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createNavbarFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createNavbarFirstDocument()
        dispatch({ type: CREATE_NAVBAR_FIRST_DOCUMENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const updateLogo = (logoText, logoImage) => async (dispatch) => {
    try {
        const { data } = await api.updateLogo(logoText, logoImage)
        dispatch({ type: UPDATE_LOGO, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const addNavLink = (name, link) => async (dispatch) => {
    try {
        const { data } = await api.addNavLink(name, link)
        dispatch({ type: ADD_NAV_LINK, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateNavLink = (navLinkId, name) => async (dispatch) => {
    try {
        const { data } = await api.updateNavLink(navLinkId, name)
        dispatch({ type: UPDATE_NAV_LINK, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteNavLink = (navLinkId) => async (dispatch) => {
    try {
        const { data } = await api.deleteNavLink(navLinkId)
        dispatch({ type: DELETE_NAV_LINK, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const addSocialMedia = (name, link) => async (dispatch) => {
    try {
        const { data } = await api.addSocialMedia(name, link)
        dispatch({ type: ADD_SOCIAL_MEDIA, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateSocialMedia = (socialId, name) => async (dispatch) => {
    try {
        const { data } = await api.updateSocialMedia(socialId, name)
        dispatch({ type: UPDATE_SOCIAL_MEDIA_NAME, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteSocialMedia = (socialId) => async (dispatch) => {
    try {
        const { data } = await api.deleteSocialMedia(socialId)
        dispatch({ type: DELETE_SOCIAL_MEDIA, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const deleteNavbarCollection = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.deleteNavbarCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}