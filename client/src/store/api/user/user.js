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


export const getPeopleContent = () => { return API.get(`/portfolio/user/get`) }
export const createPeopleFirstDocument = () => { return API.post(`/portfolio/user/create`) }

// main admin
export const updateMainAdmin = (name, email, phone) => { return API.put(`/portfolio/user/update-main-admin`, { name, email, phone }) }

// admins
export const addAdmin = (name, email, phone) => { return API.put(`/portfolio/user/add-admin`, { name, email, phone }) }
export const updateAdmin = (adminId, name, email, phone) => { return API.put(`/portfolio/user/update-admin/${adminId}`, { name, email, phone }) }
export const deleteAdmin = (email) => { return API.put(`/portfolio/user/delete-admin`, { email }) }

// subscriber
export const subscribe = (email) => { return API.put(`/portfolio/user/subscribe`, { email }) }
export const unsubscribe = (email) => { return API.put(`/portfolio/user/unsubscribe`, { email }) }

// contact form submission
export const formSubmit = (contactData) => { return API.post(`/portfolio/contact/submit`, contactData) }

// users
export const sendRegisterOTP = (email) => API.post(`/portfolio/user/send-register-otp`, { email })
export const register = (userData) => API.post(`/portfolio/user/register`, userData)            // {name, email, password, phone, otp}
export const login = (userData) => API.put(`/portfolio/user/login`, userData)
export const logout = (email) => API.put(`/portfolio/user/logout`, { email })
export const sendForgetPasswordOTP = (email) => API.post(`/portfolio/user/send-forget-pass-otp`, { email })
export const changePassword = (userData) => API.put(`/portfolio/user/change-password`, userData)
export const deleteUser = (email) => API.put(`/portfolio/user/delete-user`, { email })


export const deletePeopleCollection = () => { return API.delete(`/portfolio/user/delete-people-collection`) }