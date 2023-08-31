import express from "express"
const router = express.Router()

import {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    deleteWholeCollection
} from "../controllers/blogs.js"

import { verifyToken, verifyAdmin } from "../middleware/auth.js"


router.get('/get',  getBlogs)//verifyToken, verifyAdmin,
router.post('/create',  createBlog)//verifyToken, verifyAdmin,
router.put('/update/:blogId',  updateBlog)//verifyToken, verifyAdmin,
router.delete('/delete/:blogId',  deleteBlog)//verifyToken, verifyAdmin,

router.delete('/delete-whole-collection',  deleteWholeCollection)

export default router