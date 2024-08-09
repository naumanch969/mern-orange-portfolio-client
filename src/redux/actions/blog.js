import * as api from '../api'
import { start, end, error, getBlogsReducer, createBlogReducer, updateBlogReducer, deleteBlogReducer, } from '../reducers/blog'


export const getBlogs = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getBlogs()
        dispatch(getBlogsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createBlog = (blogData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createBlog(blogData)
        dispatch(createBlogReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateBlog = (blogId, blogData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateBlog(blogId, blogData)
        dispatch(updateBlogReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteBlog = (blogId, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteBlog(blogId)
        dispatch(deleteBlogReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}