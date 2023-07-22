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

// footer
export const getFooterContent = () => { return API.get(`/portfolio/footer/get`) }
export const createFooterFirstDocument = () => { return API.post(`/portfolio/footer/create`) }


export const updateAboutTitle = (title) => { return API.put(`/portfolio/footer/update-about-title`, { title }) }
export const updateAboutDetail = (detail) => { return API.put(`/portfolio/footer/update-about-detail`, { detail }) }

export const updateLinksTitle = (title) => { return API.put(`/portfolio/footer/update-links-title`, { title }) }
export const addLink = (name, link) => { return API.put(`/portfolio/footer/add-link`, { name, link }) }
export const updateLink = (linkId, link) => { return API.put(`/portfolio/footer/update-link/${linkId}`, link) }
export const deleteLink = (linkId) => { return API.put(`/portfolio/footer/delete-link/${linkId}`) }

export const updateServicesTitle = (title) => { return API.put(`/portfolio/footer/update-services-title`, { title }) }
export const addService = (name, link) => { return API.put(`/portfolio/footer/add-service`, { name, link }) }
export const updateService = (serviceId, service) => { return API.put(`/portfolio/footer/update-service/${serviceId}`, service) }
export const deleteService = (serviceId, name, link) => { return API.put(`/portfolio/footer/delete-service/${serviceId}`, { name, link }) }

export const updateContactTitle = (title) => { return API.put(`/portfolio/footer/update-contact-title`, { title }) }
export const addContact = (icon, text) => { return API.put(`/portfolio/footer/add-contact`, { icon, text }) }
export const updateContact = (contactId, contact) => { return API.put(`/portfolio/footer/update-contact/${contactId}`, contact) }
export const deleteContact = (contactId) => { return API.put(`/portfolio/footer/delete-contact/${contactId}`) }

export const updateCopyright = (copyrightText) => { return API.put(`/portfolio/footer/update-copyright`, { copyrightText }) }


export const deleteFooterSection = () => { return API.delete(`/portfolio/footer/delete-footer-section`) }


export const deleteFooterCollection = () => { return API.delete(`/portfolio/footer/delete-footer-collection`) }