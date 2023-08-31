import {
    getUsers,
    deleteWholeCollection,
} from "../controllers/user.js"

import express from "express"

const router = express.Router()
import { verifyToken, verifyAdmin } from "../middleware/auth.js"

router.get('/get', getUsers)
router.delete('/delete-whole-collection', deleteWholeCollection)


export default router