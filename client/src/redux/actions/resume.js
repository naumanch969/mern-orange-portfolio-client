import * as api from '../api'
import { start, end, error, getResumesReducer, createResumeReducer, updateResumeReducer, deleteResumeReducer, } from '../reducers/resume'


export const getResumes = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getResumes()
        dispatch(getResumesReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createResume = (resumeData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createResume(resumeData)
        dispatch(createResumeReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateResume = (resumeId, resumeData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateResume(resumeId, resumeData)
        dispatch(updateResumeReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteResume = (resumeId, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteResume(resumeId)
        dispatch(deleteResumeReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}