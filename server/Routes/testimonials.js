import express from "express"
const router = express.Router()

import {
    getTestimonialsContent,
    createTestimonialsContent,
    updateForwardHeading,
    updateBackHeading,
    updateDetail,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    deleteTestimonialsCollection
} from "../controllers/testimonials.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"




router.get('/get', adminAuth, getTestimonialsContent)
router.post('/create', adminAuth, createTestimonialsContent)

router.put('/update-forward-heading', adminAuth, updateForwardHeading)
router.put('/update-back-heading', adminAuth, updateBackHeading)
router.put('/update-detail', adminAuth, updateDetail)

router.put('/add-testimonial', adminAuth, addTestimonial)
router.put('/update-testimonial/:testimonialId', adminAuth, updateTestimonial)
router.put('/delete-testimonial/:testimonialId', adminAuth, deleteTestimonial)


router.delete('/delete-testimonials-collection', mainAdminAuth, deleteTestimonialsCollection)

export default router