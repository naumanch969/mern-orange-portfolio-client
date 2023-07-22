import * as api from "../../api/admin/services.js"

import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_SERVICES_CONTENT,
    CREATE_SERVICES_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,
    ADD_SERVICE,
    UPDATE_SERVICE,
    DELETE_SERVICE,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getServicesContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getServicesContent()
        dispatch({ type: GET_SERVICES_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createServicesFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createServicesFirstDocument()
        dispatch({ type: CREATE_SERVICES_FIRST_DOCUMENT, payload: data })

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




export const addService = (serviceData) => async (dispatch) => {
    try {
        const { data } = await api.addService(serviceData)
        dispatch({ type: ADD_SERVICE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateService = (serviceId, serviceData) => async (dispatch) => {
    try {
        const { data } = await api.updateService(serviceId, serviceData)
        dispatch({ type: UPDATE_SERVICE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteService = (serviceId) => async (dispatch) => {
    try {
        const { data } = await api.deleteService(serviceId)
        dispatch({ type: DELETE_SERVICE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const deleteServicesCollection = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.deleteServicesCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}