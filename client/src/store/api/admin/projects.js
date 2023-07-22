import axios from 'axios'
import Cookie from 'js-cookie'
import { BASE_URL } from '../../constants/admin'

const API = axios.create({ baseURL: BASE_URL })
API.interceptors.request.use((req) => {
    if (Cookie.get('profile')) {
        const result = JSON.parse(Cookie.get('profile'))
        const { tokens } = result
        tokens.map(token => {
            req.headers[token.name] = token.token
        })
    }
    return req
})



// projects
export const getProjectsContent = () => { return API.get(`/portfolio/projects/get`) }
export const createProjectsFirstDocument = () => { return API.post(`/portfolio/projects/create`) }

export const updateForwardHeading = (forwardHeading) => { return API.put(`/portfolio/projects/update-forward-heading`, { forwardHeading }) }
export const updateBackHeading = (backHeading) => { return API.put(`/portfolio/projects/update-back-heading`, { backHeading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/projects/update-detail`, { detail }) }

export const addProject = (projectData) => { return API.put(`/portfolio/projects/add-project`, projectData) }             //{title, technologies, link, github, detail, images}
export const updateProject = (projectId, project) => { return API.put(`/portfolio/projects/update-project/${projectId}`, project) }
export const updateProjectTechnologies = (projectId, technologies) => { return API.put(`/portfolio/projects/update-project-technologies/${projectId}`, { technologies }) }
export const addProjectImage = (projectId, file, url) => { return API.put(`/portfolio/projects/add-project-image/${projectId}`, { file, url }) }
export const deleteProjectImage = (projectId, imageId) => { return API.put(`/portfolio/projects/delete-project-image/${projectId}`, { imageId }) }
export const deleteProject = (projectId) => { return API.put(`/portfolio/projects/delete-project/${projectId}`,) }

export const deleteProjectsCollection = () => { return API.delete(`/portfolio/projects/delete-projects-collection`) }