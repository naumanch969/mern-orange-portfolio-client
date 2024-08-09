import axios from "axios";
import { baseURL } from '../../constant'
import Cookies from "js-cookie";

const API = axios.create({ baseURL })

axios.interceptors.request.use(req => {
    // const tokenString = Cookies.get('iamnauman_profile')
    // if (tokenString) {
    //     const parsedToken = JSON.parse(tokenString)
    //     req.headers.authtoken = parsedToken
    // }
    return req
})


// GENERAL
export const uploadImage = (formData) => API.post(`/upload_image`, formData)
export const deleteImage = (filename) => API.delete(`/delete_image/${filename}`)

// AUTH 
export const register = (userData) => API.post(`/auth/register`, userData)
export const login = (userData) => API.put(`/auth/login`, userData)
export const logout = () => API.put(`/logout`)
export const getUsers = () => API.get(`/user/get`)


// BLOG
export const getBlogs = () => API.get(`/blog/get`)
export const createBlog = (blogData) => API.post(`/blog/create`, blogData)
export const updateBlog = (blogId, blogData) => API.put(`/blog/update/${blogId}`, blogData)
export const deleteBlog = (blogId) => API.delete(`/blog/delete/${blogId}`)


// CONTACT
export const getContactUsers = () => API.get(`/contact/get`)
export const formSubmit = (contactData) => API.post(`/contact/submit`, contactData)


// FREELANCING
export const getCards = () => API.get(`/freelancing/get`)
export const createCard = (cardData) => API.post(`/freelancing/create`, cardData)
export const updateCard = (cardId, cardData) => API.put(`/freelancing/update/${cardId}`, cardData)
export const deleteCard = (cardId) => API.delete(`/freelancing/delete/${cardId}`)


// PROJECT
export const getProjects = () => API.get(`/project/get`)
export const createProject = (projectData) => API.post(`/project/create`, projectData)
export const updateProject = (projectId, projectData) => API.put(`/project/update/${projectId}`, projectData)
export const deleteProject = (projectId) => API.delete(`/project/delete/${projectId}`)


// RESUME
export const getResumes = () => API.get(`/resume/get`)
export const createResume = (resumeData) => API.post(`/resume/create`, resumeData)
export const updateResume = (resumeId, resumeData) => API.put(`/resume/update/${resumeId}`, resumeData)
export const deleteResume = (resumeId) => API.delete(`/resume/delete/${resumeId}`)


// SERVICE
export const getServices = () => API.get(`/service/get`)
export const createService = (serviceData) => API.post(`/service/create`, serviceData)
export const updateService = (serviceId, serviceData) => API.put(`/service/update/${serviceId}`, serviceData)
export const deleteService = (serviceId) => API.delete(`/service/delete/${serviceId}`)


// SKILL
export const getSkills = () => API.get(`/skill/get`)
export const createSkill = (skillData) => API.post(`/skill/create`, skillData)
export const updateSkill = (skillId, skillData) => API.put(`/skill/update/${skillId}`, skillData)
export const deleteSkill = (skillId) => API.delete(`/skill/delete/${skillId}`)


// TESTIMONIALS
export const getTestimonials = () => API.get(`/testimonial/get`)
export const createTestimonial = (testimonialData) => API.post(`/testimonial/create`, testimonialData)
export const updateTestimonial = (testimonialId, testimonialData) => API.put(`/testimonial/update/${testimonialId}`, testimonialData)
export const deleteTestimonial = (testimonialId) => API.delete(`/testimonial/delete/${testimonialId}`)