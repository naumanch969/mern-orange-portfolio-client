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



// navbar
export const getNavbarContent = () => { return API.get(`/portfolio/navbar/get`) }
export const createNavbarFirstDocument = () => { return API.post(`/portfolio/navbar/create`) }

export const updateLogo = (logoText, logoImage) => { return API.put(`/portfolio/navbar/update-logo`, { logoText, logoImage }) }

export const addNavLink = (name, link) => { return API.put(`/portfolio/navbar/add-navlink`, { name, link }) }
export const updateNavLink = (navLinkId, navLink) => { return API.put(`/portfolio/navbar/update-navlink/${navLinkId}`, navLink) }
export const deleteNavLink = (navLinkId) => { return API.put(`/portfolio/navbar/delete-navlink/${navLinkId}`) }

export const addSocialMedia = (name, link) => { return API.put(`/portfolio/navbar/add-social-media`, { name, link }) }
export const updateSocialMedia = (socialId, socialMedia) => { return API.put(`/portfolio/navbar/update-social-media/${socialId}`, socialMedia) }
export const deleteSocialMedia = (socialId) => { return API.put(`/portfolio/navbar/delete-social-media/${socialId}`) }

export const deleteNavbarCollection = () => { return API.delete(`/portfolio/navbar/delete-navbar-collection`) }