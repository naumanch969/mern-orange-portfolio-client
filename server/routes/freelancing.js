import express from "express"
const router = express.Router()

import {
    getCards,
    createCard,
    updateCard,
    deleteCard,
 
    deleteWholeCollection
} from "../controllers/freelancing.js"

import { verifyToken, verifyAdmin } from "../middleware/auth.js"
 
router.get('/get',  getCards)//verifyToken, verifyAdmin,
router.post('/create',  createCard)//verifyToken, verifyAdmin,
router.put('/update/:cardId',  updateCard)//verifyToken, verifyAdmin,
router.delete('/delete/:cardId',  deleteCard)//verifyToken, verifyAdmin,

router.delete('/delete-whole-collection',  deleteWholeCollection)

export default router