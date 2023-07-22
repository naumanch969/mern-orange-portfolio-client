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



// resumes
export const getResumesContent = () => { return API.get(`/portfolio/resumes/get`) }
export const createResumesFirstDocument = () => { return API.post(`/portfolio/resumes/create`) }

export const updateForwardHeading = (forwardHeading) => { return API.put(`/portfolio/resumes/update-forward-heading`, { forwardHeading }) }
export const updateBackHeading = (backHeading) => { return API.put(`/portfolio/resumes/update-back-heading`, { backHeading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/resumes/update-detail`, { detail }) }

export const addResume = (resumeData) => { return API.put(`/portfolio/resumes/add-resume`, resumeData) }   //title, subTitle, detail, date
export const updateResume = (resumeId, resumeData) => { return API.put(`/portfolio/resumes/update-resume/${resumeId}`, resumeData) }
export const deleteResume = (resumeId) => { return API.put(`/portfolio/resumes/delete-resume/${resumeId}`,) }

export const addButton = (text, variant) => { return API.put(`/portfolio/resumes/add-button`, { text, variant }) }
export const updateButton = (buttonId, button) => { return API.put(`/portfolio/resumes/update-button/${buttonId}`, button) }
export const deleteButton = (buttonId) => { return API.put(`/portfolio/resumes/delete-button/${buttonId}`,) }

export const deleteResumesCollection = () => { return API.delete(`/portfolio/resumes/delete-resumes-collection`) }