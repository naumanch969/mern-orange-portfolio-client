import * as api from "../../api/admin/skills.js"

import {
    START_LOADING,
    END_LOADING,
    ERROR,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,

    GET_SKILLS_CONTENT,
    CREATE_SKILLS_FIRST_DOCUMENT,
    ADD_SKILL,
    UPDATE_SKILL,
    DELETE_SKILL,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getSkillsContent = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getSkillsContent()
        dispatch({ type: GET_SKILLS_CONTENT, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createSkillsFirstDocument = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.createSkillsFirstDocument()
        dispatch({ type: CREATE_SKILLS_FIRST_DOCUMENT, payload: data })

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




export const addSkill = (skill, percentage) => async (dispatch) => {
    try {
        const { data } = await api.addSkill(skill, percentage)
        dispatch({ type: ADD_SKILL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateSkill = (skillId, skill) => async (dispatch) => {        // {skill, percentage}
    try {
        const { data } = await api.updateSkill(skillId, skill)
        dispatch({ type: UPDATE_SKILL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteSkill = (skillId) => async (dispatch) => {
    try {
        const { data } = await api.deleteSkill(skillId)
        dispatch({ type: DELETE_SKILL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const deleteSkillsCollection = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.deleteSkillsCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}