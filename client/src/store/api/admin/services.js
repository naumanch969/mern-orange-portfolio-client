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



// services
export const getServicesContent = () => { return API.get(`/portfolio/services/get`) }
export const createServicesFirstDocument = () => { return API.post(`/portfolio/services/create`) }

export const updateForwardHeading = (forwardHeading) => { return API.put(`/portfolio/services/update-forward-heading`, { forwardHeading }) }
export const updateBackHeading = (backHeading) => { return API.put(`/portfolio/services/update-back-heading`, { backHeading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/services/update-detail`, { detail }) }

export const addService = (serviceData) => { return API.put(`/portfolio/services/add-service`, serviceData) }          // {icon, service, link}
export const updateService = (serviceId, serviceData) => { return API.put(`/portfolio/services/update-service/${serviceId}`, serviceData) }
export const deleteService = (serviceId) => { return API.put(`/portfolio/services/delete-service/${serviceId}`,) }

export const deleteServicesCollection = () => { return API.delete(`/portfolio/services/delete-services-collection`) }