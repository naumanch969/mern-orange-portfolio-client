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



// home
export const getHomeContent = () => { return API.get(`/portfolio/home/get`) }
export const createHomeFirstDocument = () => { return API.post(`/portfolio/home/create`) }

export const updateHelloText = (helloText) => { return API.put(`/portfolio/home/update-hello-text`, { helloText }) }
export const updateHeading1 = (heading1) => { return API.put(`/portfolio/home/update-heading1`, { heading1 }) }
export const updateHeading2 = (heading2) => { return API.put(`/portfolio/home/update-heading2`, { heading2 }) }
export const updateSubHeading1 = (subHeading1) => { return API.put(`/portfolio/home/update-sub-heading1`, { subHeading1 }) }

export const addButton = (text, variant) => { return API.put(`/portfolio/home/add-button`, { text, variant }) }
export const updateButton = (buttonId, button) => { return API.put(`/portfolio/home/update-button/${buttonId}`, button) }
export const deleteButton = (buttonId) => { return API.put(`/portfolio/home/delete-button/${buttonId}`,) }

export const addImage = (file, url) => { return API.put(`/portfolio/home/add-home-image`, { file, url }) }
export const deleteImage = (imageId) => { return API.put(`/portfolio/home/delete-home-image/${imageId}`) }



export const deleteHomeCollection = () => { return API.delete(`/portfolio/home/delete-home-collection`) }