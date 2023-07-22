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



// contact
export const getContactContent = () => { return API.get(`/portfolio/contact/get`) }
export const createContactFirstDocument = () => { return API.post(`/portfolio/contact/create`) }

export const updateForwardHeading = (forwardHeading) => { return API.put(`/portfolio/contact/update-forward-heading`, { forwardHeading }) }
export const updateBackHeading = (backHeading) => { return API.put(`/portfolio/contact/update-back-heading`, { backHeading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/contact/update-detail`, { detail }) }

export const addContactCard = (icon, title, detail) => { return API.put(`/portfolio/contact/add-contact-card`, { icon, title, detail }) }
export const updateContactCard = (cardId, card) => { return API.put(`/portfolio/contact/update-contact-card/${cardId}`, card) }
export const deleteContactCard = (cardId) => { return API.put(`/portfolio/contact/delete-contact-card/${cardId}`) }

export const addContactImage = (file, url) => { return API.put(`/portfolio/contact/add-image`, { file, url }) }
export const deleteContactImage = (imageId) => { return API.put(`/portfolio/contact/delete-image/${imageId}`) }


export const updateInputs = (inputData) => { return API.put(`/portfolio/contact/update-inputs`, inputData) }

export const addContactButton = (text, variant) => { return API.put(`/portfolio/contact/add-button`, { text, variant }) }
export const updateContactButton = (buttonId, button) => { return API.put(`/portfolio/contact/update-button/${buttonId}`, button) }
export const deleteContactButton = (buttonId) => { return API.put(`/portfolio/contact/delete-button/${buttonId}`,) }

export const deleteContactCollection = () => { return API.delete(`/portfolio/contact/delete-contact-collection`) }