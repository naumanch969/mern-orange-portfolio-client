import Blogs from "../models/blogs.js";
import { createError } from "../utils/error.js";



export const getBlogs = async (_req, res) => {
    try {
        const blogs = await Blogs.find()
        res.status(200).json({ result: blogs, message: 'blogs fetched successfully', success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}


export const createBlog = async (req, res, next) => {
    try {
        const { title, description, name, image } = req.body;
        if (!title || !description || !name) return next(createError(400, 'Make sure to provide all the fields.'))

        const result = await Blogs.create({ title, description, name, image })
        res.status(200).json({ result, message: 'blog added successfully', success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params
        const findedBlog = await Blogs.findById(blogId)
        if (!findedBlog) return next(createError(400, 'Blog not exist.'))

        const result = await Blogs.findByIdAndUpdate(blogId, { $set: req.body }, { new: true })
        res.status(200).json({ result, message: 'blog updated successfully', success: false })
    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params
        const findedBlog = await Blogs.findById(blogId)
        if (!findedBlog) return next(createError(400, 'Blog not exist.'))

        const result = await Blogs.findByIdAndDelete(blogId)
        res.status(200).json({ result, message: `blog deleted successfully`, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}



export const deleteWholeCollection = async (req, res, next) => {
    try {
        const result = await Blogs.deleteMany()
        res.status(200).json({ result: result, message: `Blogs collection deleted successfully`, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}