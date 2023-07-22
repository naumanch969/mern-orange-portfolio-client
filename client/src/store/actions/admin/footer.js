import * as api from "../../api/admin/footer.js"
import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_FOOTER_CONTENT,
    CREATE_FOOTER_FIRST_DOCUMENT,
    UPDATE_ABOUT_TITLE,
    UPDATE_ABOUT_DETAIL,

    UPDATE_LINKS_TITLE,
    ADD_FOOTER_LINK,
    UPDATE_FOOTER_LINK,
    DELETE_FOOTER_LINK,

    UPDATE_SERVICES_TITLE,
    ADD_FOOTER_SERVICE,
    UPDATE_FOOTER_SERVICE,
    DELETE_FOOTER_SERVICE,

    UPDATE_CONTACT_TITLE,
    ADD_FOOTER_CONTACT,
    UPDATE_FOOTER_CONTACT,
    DELETE_FOOTER_CONTACT,

    UPDATE_COPYRIGHT,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getFooterContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getFooterContent()
        dispatch({ type: GET_FOOTER_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createFooterFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createFooterFirstDocument()
        dispatch({ type: CREATE_FOOTER_FIRST_DOCUMENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}












export const updateAboutTitle = (title) => async (dispatch) => {
    try {
        const { data } = await api.updateAboutTitle(title)
        dispatch({ type: UPDATE_ABOUT_TITLE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateAboutDetail = (detail) => async (dispatch) => {
    try {
        const { data } = await api.updateAboutDetail(detail)
        dispatch({ type: UPDATE_ABOUT_DETAIL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}








export const updateLinksTitle = (title) => async (dispatch) => {
    try {
        const { data } = await api.updateLinksTitle(title)
        dispatch({ type: UPDATE_LINKS_TITLE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const addLink = (name, link) => async (dispatch) => {
    try {
        const { data } = await api.addLink(name, link)
        dispatch({ type: ADD_FOOTER_LINK, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateLink = (linkId, link) => async (dispatch) => {  // {name, link}
    try {
        const { data } = await api.updateLink(linkId, link)
        dispatch({ type: UPDATE_FOOTER_LINK, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteLink = (linkId) => async (dispatch) => {
    try {
        const { data } = await api.deleteLink(linkId)
        dispatch({ type: DELETE_FOOTER_LINK, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const updateServicesTitle = (title) => async (dispatch) => {
    try {
        const { data } = await api.updateServicesTitle(title)
        dispatch({ type: UPDATE_SERVICES_TITLE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const addService = (name, link) => async (dispatch) => {
    try {
        const { data } = await api.addService(name, link)
        dispatch({ type: ADD_FOOTER_SERVICE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateService = (serviceId, service) => async (dispatch) => {      // {name, link}
    try {
        const { data } = await api.updateService(serviceId, service)
        dispatch({ type: UPDATE_FOOTER_SERVICE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteService = (serviceId, name, link) => async (dispatch) => {
    try {
        const { data } = await api.deleteService(serviceId, name, link)
        dispatch({ type: DELETE_FOOTER_SERVICE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const updateContactTitle = (title) => async (dispatch) => {
    try {
        const { data } = await api.updateContactTitle(title)
        dispatch({ type: UPDATE_CONTACT_TITLE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const addContact = (icon, text) => async (dispatch) => {
    try {
        const { data } = await api.addContact(icon, text)
        dispatch({ type: ADD_FOOTER_CONTACT, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateContact = (contactId, contact) => async (dispatch) => {
    try {
        const { data } = await api.updateContact(contactId, contact)
        dispatch({ type: UPDATE_FOOTER_CONTACT, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteContact = (contactId) => async (dispatch) => {
    try {
        const { data } = await api.deleteContact(contactId)
        dispatch({ type: DELETE_FOOTER_CONTACT, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}







export const updateCopyright = (copyrightText) => async (dispatch) => {
    try {
        const { data } = await api.updateCopyright(copyrightText)
        dispatch({ type: UPDATE_COPYRIGHT, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const deleteFooterSection = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.deleteFooterSection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}

