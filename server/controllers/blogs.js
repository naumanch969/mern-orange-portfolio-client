import Blogs from "../models/blogs.js";



export const getBlogsContent = async (_req, res) => {
    try {
        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]

        if (!blogsObj) return res.status(200).json({ result: { blogsDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: blogsObj, message: 'blogs content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getBlogsContent - blogs.js - controllers', error })
    }
}



export const createBlogsContent = async (_req, res) => {
    try {
        const [forwardHeading, backHeading, detail, blogs] = ['', '', '', []];

        const blogsArr = await Blogs.find()
        if (blogsArr.length > 0) return res.status(400).json({ message: 'there should only be one Blogs document. So this post action can not be proceed.' })

        const result = await Blogs.create({ forwardHeading, backHeading, detail, blogs })
        res.status(200).json({ result, message: 'blog content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createBlogsContent - blogs.js - controllers', error })
    }
}







export const updateForwardHeading = async (req, res) => {
    try {
        const { forwardHeading } = req.body;
        if (!forwardHeading) return res.status(400).json({ message: `forwardHeading field should be provided` })

        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]
        const blogsObjId = blogsObj._id
        if (!blogsObj) return res.status(400).json({ message: 'blogs document has not been created yet' })


        blogsObj.forwardHeading = forwardHeading
        await Blogs.findByIdAndUpdate(blogsObjId, blogsObj, { new: true })
        res.status(200).json({ result: forwardHeading, message: 'forwardHeading of Blogs content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateForwardHeading - blogs.js - controllers', error })
    }
}

export const updateBackHeading = async (req, res) => {
    try {

        const { backHeading } = req.body;
        if (!backHeading) return res.status(400).json({ message: `backHeading field should be provided` })

        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]
        const blogsObjId = blogsObj._id
        if (!blogsObj) return res.status(400).json({ message: 'blogs document has not been created yet' })


        blogsObj.backHeading = backHeading
        await Blogs.findByIdAndUpdate(blogsObjId, blogsObj, { new: true })
        res.status(200).json({ result: backHeading, message: 'backHeading of Blogs content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateBackHeading - blogs.js - controllers', error })
    }
}

export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (!detail) return res.status(400).json({ message: `detail field should be provided` })

        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]
        const blogsObjId = blogsObj._id
        if (!blogsObj) return res.status(400).json({ message: 'Blogs document has not been created yet' })


        blogsObj.detail = detail
        await Blogs.findByIdAndUpdate(blogsObjId, blogsObj, { new: true })
        res.status(200).json({ result: detail, message: 'detail of Blogs content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - blogs.js - controllers', error })
    }
}







export const addBlog = async (req, res) => {
    try {
        const { title, description, date, name, images } = req.body;
        if (typeof (title) == 'undefined' || typeof (description) == 'undefined' || typeof (date) == 'undefined' || typeof (name) == 'undefined' || typeof (images) == 'undefined') return res.status(400).json({ message: `make sure to provide all 5 fields` })

        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]
        const blogsObjId = blogsObj._id
        if (!blogsObj) return res.status(400).json({ message: 'Blogs document has not been created yet' })

        blogsObj.blogs = blogsObj.blogs.concat({ title, description, date, name, images })
        await Blogs.findByIdAndUpdate(blogsObjId, blogsObj, { new: true })
        res.status(200).json({ result: blogsObj.blogs, message: 'blog added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addBlog - blogs.js - controllers', error })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params
        const { title, description, date, name, images } = req.body;
        if (typeof (title) == 'undefined' || typeof (description) == 'undefined' || typeof (date) == 'undefined' || typeof (name) == 'undefined' || typeof (images) == 'undefined') return res.status(400).json({ message: `title, description, date, name and images field should be provided` })

        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]
        const blogsObjId = blogsObj._id
        if (!blogsObj) return res.status(400).json({ message: 'blogs document has not been created yet' })

        const findedBlog = blogsObj.blogs.find((blog) => blog._id == blogId)
        if (!findedBlog) return res.status(400).json({ message: `no blog exist with id ${id}` })

        findedBlog.title = title
        findedBlog.description = description
        findedBlog.date = date
        findedBlog.name = name
        findedBlog.images = images
        await Blogs.findByIdAndUpdate(blogsObjId, blogsObj, { new: true })
        res.status(200).json({ result: findedBlog, blogId, message: 'blog updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateBlogTitle - controllers', error })
    }
}

export const addBlogImage = async (req, res) => {
    try {
        const { blogId } = req.params
        const { file, url } = req.body;
        if (!file || !url) return res.status(400).json({ message: `file and url fields should be provided` })

        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]
        const blogsObjId = blogsObj._id
        if (!blogsObj) return res.status(400).json({ message: 'blogs document has not been created yet' })

        const findedBlog = blogsObj.blogs.find((blog) => blog._id == blogId)
        if (!findedBlog) return res.status(400).json({ message: `no blog exist with id ${id}` })


        findedBlog.images = findedBlog.images.concat({ file, url })
        await Blogs.findByIdAndUpdate(blogsObjId, blogsObj, { new: true })
        res.status(200).json({ result: findedBlog.images, blogId, message: `image added to blog of id ${blogId} added successfully ` })

    } catch (error) {
        res.status(404).json({ message: 'error in addBlogImage - controllers', error })
    }
}
export const deleteBlogImage = async (req, res) => {
    try {
        const { blogId } = req.params
        const { imageId } = req.body;
        if (!imageId) return res.status(400).json({ message: `imageId field should be provided` })

        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]
        const blogsObjId = blogsObj._id
        if (!blogsObj) return res.status(400).json({ message: 'blogs document has not been created yet' })

        const findedBlog = blogsObj.blogs.find((blog) => blog._id == blogId)
        if (!findedBlog) return res.status(400).json({ message: `no blog exist with id ${blogId}` })
        const findedImage = findedBlog.images.find(image => image._id == imageId)
        if (!findedImage) return res.status(400).json({ message: `no image exist with id ${imageId}` })

        findedBlog.images = findedBlog.images.filter(image => image._id != imageId)
        await Blogs.findByIdAndUpdate(blogsObjId, blogsObj, { new: true })
        res.status(200).json({ result: findedBlog.images, blogId, message: `image of ${imageId} of blog of id ${blogId} updated successfully ` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteBlogImage - controllers', error })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params

        const blogsArr = await Blogs.find()
        const blogsObj = blogsArr[0]
        const blogsObjId = blogsObj._id
        if (!blogsObj) return res.status(400).json({ message: 'blogs document has not been created yet' })

        const findedBlog = blogsObj.blogs.find((blog) => blog._id == blogId)
        if (!findedBlog) return res.status(400).json({ message: `no blog exist with id ${id}` })

        blogsObj.blogs = blogsObj.blogs.filter(blog => blog._id != blogId)
        await Blogs.findByIdAndUpdate(blogsObjId, blogsObj, { new: true })
        res.status(200).json({ result: blogsObj.blogs, message: `blog of ${blogId} deleted successfully ` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteBlog - controllers', error })
    }
}



export const deleteBlogsCollection = async (req, res) => {
    try {
        const result = await Blogs.deleteMany()
        res.status(200).json({ result: { ...result, blogsDocumentNotExist: true }, message: `Blogs collection deleted successfully` })
    } catch (error) {
        res.status(500).json({ error, message: "error in deleteBlogsCollection - controllers" })
    }
}