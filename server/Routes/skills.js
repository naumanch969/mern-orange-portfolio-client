import express from "express"
const router = express.Router()

import {
    getSkillsContent,
    createSkillsContent,

    updateForwardHeading,
    updateBackHeading,
    updateDetail,

    addSkill,
    updateSkill,
    deleteSkill,

    deleteSkillsCollection
} from "../controllers/skills.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"





router.get('/get', adminAuth, getSkillsContent)
router.post('/create', adminAuth, createSkillsContent)

router.put('/update-forward-heading', adminAuth, updateForwardHeading)
router.put('/update-back-heading', adminAuth, updateBackHeading)
router.put('/update-detail', adminAuth, updateDetail)

router.put('/add-skill', adminAuth, addSkill)
router.put('/update-skill/:skillId', adminAuth, updateSkill)
router.put('/delete-skill/:skillId', adminAuth, deleteSkill)


router.delete('/delete-skills-collection', mainAdminAuth, deleteSkillsCollection)



export default router