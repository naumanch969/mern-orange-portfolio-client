import * as api from "../../api/admin/blogs.js"
import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_BLOGS_CONTENT,
    CREATE_BLOGS_FIRST_DOCUMENT,
    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,

    ADD_BLOG,
    UPDATE_BLOG,
    ADD_BLOG_IMAGE,
    DELETE_BLOG_IMAGE,
    DELETE_BLOG,

    DELETE_SECTION
} from "../../constants/admin/index"


export const getBlogsContent = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getBlogsContent()
        dispatch({ type: GET_BLOGS_CONTENT, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createBlogsFirstDocument = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.createBlogsFirstDocument()
        dispatch({ type: CREATE_BLOGS_FIRST_DOCUMENT, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}




export const updateForwardHeading = (forwardHeading) => async (dispatch) => {
    try {
        const { data } = await api.updateForwardHeading(forwardHeading)
        dispatch({ type: UPDATE_FORWARD_HEADING, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateBackHeading = (backHeading) => async (dispatch) => {
    try {
        const { data } = await api.updateBackHeading(backHeading)
        dispatch({ type: UPDATE_BACK_HEADING, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateDetail = (detail) => async (dispatch) => {
    try {
        const { data } = await api.updateDetail(detail)
        dispatch({ type: UPDATE_DETAIL, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}





export const addBlog = (blogData) => async (dispatch) => {          //{title, description, data, name, images}
    try {
        const { data } = await api.addBlog(blogData)
        dispatch({ type: ADD_BLOG, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}


export const updateBlog = (blogId, blog) => async (dispatch) => {          //{title, description, data, name, images}
    try {
        const { data } = await api.updateBlog(blogId, blog)
        dispatch({ type: UPDATE_BLOG, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}


export const addBlogImage = (blogId, file, url) => async (dispatch) => {
    try {
        const { data } = await api.addBlogImage(blogId, file, url)
        dispatch({ type: ADD_BLOG_IMAGE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteBlogImage = (blogId, imageId) => async (dispatch) => {
    try {
        const { data } = await api.deleteBlogImage(blogId, imageId)
        dispatch({ type: DELETE_BLOG_IMAGE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}


export const deleteBlog = (blogId) => async (dispatch) => {
    try {
        const { data } = await api.deleteBlog(blogId)
        dispatch({ type: DELETE_BLOG, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const deleteBlogsCollection = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.deleteBlogsCollection()
        dispatch({ type: DELETE_SECTION, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}