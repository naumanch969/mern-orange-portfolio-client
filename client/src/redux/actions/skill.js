import * as api from '../api'
import { start, end, error, getSkillsReducer, createSkillReducer, updateSkillReducer, deleteSkillReducer, } from '../reducers/skill'


export const getSkills = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSkills()
        dispatch(getSkillsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createSkill = (skillData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createSkill(skillData)
        dispatch(createSkillReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateSkill = (skillId, skillData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateSkill(skillId, skillData)
        dispatch(updateSkillReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteSkill = (skillId,setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteSkill(skillId)
        dispatch(deleteSkillReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}