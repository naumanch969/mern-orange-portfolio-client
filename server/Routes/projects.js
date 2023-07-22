import express from "express"
const router = express.Router()

import {
    getProjectsContent,
    createProjectsContent,

    updateForwardHeading,
    updateBackHeading,
    updateDetail,

    addProject,
    updateProject,
    addProjectImage,
    deleteProjectImage,
    deleteProject,
    deleteProjectsCollection
} from "../controllers/projects.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"




router.get('/get', adminAuth, getProjectsContent)
router.post('/create', adminAuth, createProjectsContent)

router.put('/update-forward-heading', adminAuth, updateForwardHeading)
router.put('/update-back-heading', adminAuth, updateBackHeading)
router.put('/update-detail', adminAuth, updateDetail)

router.put('/add-project', adminAuth, addProject)
router.put('/update-project/:projectId', adminAuth, updateProject)
router.put('/add-project-image/:projectId', adminAuth, addProjectImage)
router.put('/delete-project-image/:projectId', adminAuth, deleteProjectImage)
router.put('/delete-project/:projectId', adminAuth, deleteProject)


router.delete('/delete-projects-collection', mainAdminAuth, deleteProjectsCollection)

export default router