import express from "express"
const router = express.Router()

import {
    getResumesContent,
    createResumesContent,
    updateForwardHeading,
    updateBackHeading,
    updateDetail,
    addResume,
    updateResume,
    deleteResume,

    addButton,
    updateButton,
    deleteButton,

    deleteResumesCollection
} from "../controllers/resumes.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"



router.get('/get', adminAuth, getResumesContent)
router.post('/create', adminAuth, createResumesContent)

router.put('/update-forward-heading', adminAuth, updateForwardHeading)
router.put('/update-back-heading', adminAuth, updateBackHeading)
router.put('/update-detail', adminAuth, updateDetail)

router.put('/add-resume', adminAuth, addResume)
router.put('/update-resume/:resumeId', adminAuth, updateResume)
router.put('/delete-resume/:resumeId', adminAuth, deleteResume)


router.put('/add-button', adminAuth, addButton)
router.put('/update-button/:buttonId', adminAuth, updateButton)
router.put('/delete-button/:buttonId', adminAuth, deleteButton)


router.delete('/delete-resumes-collection', mainAdminAuth, deleteResumesCollection)



export default router