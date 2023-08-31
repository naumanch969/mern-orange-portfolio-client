import express from "express"
const router = express.Router()

import {
    getResumes,
    createResume,
    updateResume,
    deleteResume,

    deleteWholeCollection
} from "../controllers/resumes.js"

import { verifyToken, verifyAdmin } from "../middleware/auth.js"
 


router.get('/get',  getResumes)//verifyToken, verifyAdmin,
router.post('/create',  createResume)//verifyToken, verifyAdmin,
router.put('/update/:resumeId',  updateResume)//verifyToken, verifyAdmin,
router.delete('/delete/:resumeId',  deleteResume)//verifyToken, verifyAdmin,

router.delete('/delete-whole-collection',  deleteWholeCollection)

export default router