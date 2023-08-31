import express from "express"
const router = express.Router()

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    deleteWholeCollection
} from "../controllers/projects.js"

import { verifyToken, verifyAdmin } from "../middleware/auth.js"




router.get('/get', getProjects)//verifyToken, verifyAdmin,
router.post('/create', createProject)//verifyToken, verifyAdmin,
router.put('/update/:projectId', updateProject)//verifyToken, verifyAdmin,
router.delete('/delete/:projectId', deleteProject)//verifyToken, verifyAdmin,

router.delete('/delete-whole-collection', deleteWholeCollection)

export default router