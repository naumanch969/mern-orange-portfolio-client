import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        isFetching: false,
        error: null,
        blogs: [],
        currentBlog: null
    },
    reducers: {
        start: (state) => { state.isFetching = true, state.error = null },
        end: (state) => { state.isFetching = false, state.error = null },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        getBlogsReducer: (state, action) => { state.blogs = action.payload },
        createBlogReducer: (state, action) => { state.blogs = [action.payload, ...state.blogs] },
        updateBlogReducer: (state, action) => { state.blogs = state.blogs.map(b => b = b._id == action.payload._id ? action.payload : b) },
        deleteBlogReducer: (state, action) => { state.blogs = state.blogs.filter(b=>b._id != action.payload._id ) },
    }
})

export const { start, end, error, getBlogsReducer, createBlogReducer, updateBlogReducer, deleteBlogReducer, } = blogSlice.actions
export default blogSlice.reducer