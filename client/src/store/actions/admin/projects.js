import * as api from "../../api/admin/projects.js"

import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_PROJECTS_CONTENT,
    CREATE_PROJECTS_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,

    ADD_PROJECT,
    UPDATE_PROJECT,
    ADD_PROJECT_IMAGE,
    DELETE_PROJECT_IMAGE,
    DELETE_PROJECT,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getProjectsContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.getProjectsContent()
        dispatch({ type: GET_PROJECTS_CONTENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const createProjectsFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createProjectsFirstDocument()
        dispatch({ type: CREATE_PROJECTS_FIRST_DOCUMENT, payload: data })

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







export const addProject = (projectData) => async (dispatch) => {     //{title, technologies, link, github, detail}
    try {
        const { data } = await api.addProject(projectData)
        dispatch({ type: ADD_PROJECT, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateProject = (projectId, project) => async (dispatch) => {
    try {
        const { data } = await api.updateProject(projectId, project)
        dispatch({ type: UPDATE_PROJECT, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const addProjectImage = (projectId, file, url) => async (dispatch) => {
    try {
        const { data } = await api.addProjectImage(projectId, file, url)
        dispatch({ type: ADD_PROJECT_IMAGE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteProjectImage = (projectId, imageId) => async (dispatch) => {
    try {
        const { data } = await api.deleteProjectImage(projectId, imageId)
        dispatch({ type: DELETE_PROJECT_IMAGE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteProject = (projectId) => async (dispatch) => {
    try {
        const { data } = await api.deleteProject(projectId)
        dispatch({ type: DELETE_PROJECT, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}






export const deleteProjectsCollection = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.deleteProjectsCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}