import * as api from '../api'
import { start, end, error, getProjectsReducer, createProjectReducer, uploadProjectImageReducer, updateProjectReducer, deleteProjectReducer, } from '../reducers/project'


export const getProjects = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getProjects()
        dispatch(getProjectsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createProject = (projectData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createProject(projectData)
        dispatch(createProjectReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateProject = (projectId, projectData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateProject(projectId, projectData)
        dispatch(updateProjectReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteProject = (projectId, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteProject(projectId)
        dispatch(deleteProjectReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}