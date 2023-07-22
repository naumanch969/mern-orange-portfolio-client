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


// blogs
export const getBlogsContent = () => { return API.get(`/portfolio/blogs/get`) }
export const createBlogsFirstDocument = () => { return API.post(`/portfolio/blogs/create`) }

export const updateForwardHeading = (forwardHeading) => { return API.put(`/portfolio/blogs/update-forward-heading`, { forwardHeading }) }
export const updateBackHeading = (backHeading) => { return API.put(`/portfolio/blogs/update-back-heading`, { backHeading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/blogs/update-detail`, { detail }) }

export const addBlog = (blogData) => { return API.put(`/portfolio/blogs/add-blog`, blogData) }                 // {title, description, date, name, images}

export const updateBlog = (blogId, blog) => { return API.put(`/portfolio/blogs/update-blog/${blogId}`, blog) }

export const addBlogImage = (blogId, file, url) => { return API.put(`/portfolio/blogs/add-blog-image/${blogId}`, { file, url }) }
export const deleteBlogImage = (blogId, imageId) => { return API.put(`/portfolio/blogs/delete-blog-image/${blogId}`, { imageId }) }


export const deleteBlog = (blogId) => { return API.put(`/portfolio/blogs/delete-blog/${blogId}`) }


export const deleteBlogsCollection = () => { return API.delete(`/portfolio/blogs/delete-blogs-collection`) }