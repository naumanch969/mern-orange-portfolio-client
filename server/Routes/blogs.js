import express from "express"
const router = express.Router()

import {
    getBlogsContent,
    createBlogsContent,

    updateForwardHeading,
    updateBackHeading,
    updateDetail,

    addBlog,

    updateBlog,

    addBlogImage,
    deleteBlogImage,

    deleteBlog,

    deleteBlogsCollection
} from "../controllers/blogs.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"




router.get('/get', adminAuth, getBlogsContent)
router.post('/create', adminAuth, createBlogsContent)

router.put('/update-forward-heading', adminAuth, updateForwardHeading)
router.put('/update-back-heading', adminAuth, updateBackHeading)
router.put('/update-detail', adminAuth, updateDetail)
router.put('/add-blog', adminAuth, addBlog)

router.put('/update-blog/:blogId', adminAuth, updateBlog)
router.put('/add-blog-image/:blogId', adminAuth, addBlogImage)
router.put('/delete-blog-image/:blogId', adminAuth, deleteBlogImage)


router.put('/delete-blog/:blogId', adminAuth, deleteBlog)


router.delete('/delete-blogs-collection', mainAdminAuth, deleteBlogsCollection)



export default router