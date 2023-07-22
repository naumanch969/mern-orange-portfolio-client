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



// testimonials
export const getTestimonialsContent = () => { return API.get(`/portfolio/testimonials/get`) }
export const createTestimonialsContent = () => { return API.post(`/portfolio/testimonials/create`) }

export const updateForwardHeading = (forwardHeading) => { return API.put(`/portfolio/testimonials/update-forward-heading`, { forwardHeading }) }
export const updateBackHeading = (backHeading) => { return API.put(`/portfolio/testimonials/update-back-heading`, { backHeading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/testimonials/update-detail`, { detail }) }

export const addTestimonial = (testimonialData) => { return API.put(`/portfolio/testimonials/add-testimonial`, testimonialData) }             //{ content, name, designation, image}
export const updateTestimonial = (testimonialId, testimonialData) => { return API.put(`/portfolio/testimonials/update-testimonial/${testimonialId}`, testimonialData) }
export const deleteTestimonial = (testimonialId) => { return API.put(`/portfolio/testimonials/delete-testimonial/${testimonialId}`,) }

export const deleteTestimonialsCollection = () => { return API.delete(`/portfolio/testimonials/delete-testimonials-collection`) }