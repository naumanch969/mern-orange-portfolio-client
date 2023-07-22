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


// about
export const getAboutContent = () => { return API.get(`/portfolio/about/get`) }
export const createAboutFirstDocument = () => { return API.post(`/portfolio/about/create`) }

export const updateForwardHeading = (forwardHeading) => { return API.put(`/portfolio/about/update-forward-heading`, { forwardHeading }) }
export const updateBackHeading = (backHeading) => { return API.put(`/portfolio/about/update-back-heading`, { backHeading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/about/update-detail`, { detail }) }
export const updateName = (name) => { return API.put(`/portfolio/about/update-name`, { name }) }
export const updateDOB = (DOB) => { return API.put(`/portfolio/about/update-DOB`, { DOB }) }
export const updateAddress = (address) => { return API.put(`/portfolio/about/update-address`, { address }) }
export const updatePhone = (phone) => { return API.put(`/portfolio/about/update-phone`, { phone }) }
export const updateEmail = (email) => { return API.put(`/portfolio/about/update-email`, { email }) }
export const updateSubText = (subText) => { return API.put(`/portfolio/about/update-sub-text`, { subText }) }

export const addButton = (text, variant) => { return API.put(`/portfolio/about/add-button`, { text, variant }) }
export const updateButton = (buttonId, button) => { return API.put(`/portfolio/about/update-button/${buttonId}`, button) }
export const deleteButton = (buttonId) => { return API.put(`/portfolio/about/delete-button/${buttonId}`,) }

export const addImage = (file, url) => { return API.put(`/portfolio/about/add-image`, { file, url }) }
export const deleteImage = (imageId) => { return API.put(`/portfolio/about/delete-image/${imageId}`) }


export const deleteAboutCollection = () => { return API.delete(`/portfolio/about/delete-about-collection`) }