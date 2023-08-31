import express from "express"
const router = express.Router()

import {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    deleteWholeCollection
} from "../controllers/testimonials.js"

import { verifyToken, verifyAdmin } from "../middleware/auth.js"
 
router.get('/get',  getTestimonials)//verifyToken, verifyAdmin,
router.post('/create',  createTestimonial)//verifyToken, verifyAdmin,
router.put('/update/:testimonialId',  updateTestimonial)//verifyToken, verifyAdmin,
router.delete('/delete/:testimonialId',  deleteTestimonial)//verifyToken, verifyAdmin,

router.delete('/delete-whole-collection',  deleteWholeCollection)

export default router