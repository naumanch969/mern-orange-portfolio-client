import express from "express"
const router = express.Router()

import {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,

    deleteWholeCollection
} from "../controllers/skills.js"

import { verifyToken, verifyAdmin } from "../middleware/auth.js"
 

router.get('/get',  getSkills)//verifyToken, verifyAdmin,
router.post('/create',  createSkill)//verifyToken, verifyAdmin,
router.put('/update/:skillId',  updateSkill)//verifyToken, verifyAdmin,
router.delete('/delete/:skillId',  deleteSkill)//verifyToken, verifyAdmin,

router.delete('/delete-whole-collection',  deleteWholeCollection)

export default router