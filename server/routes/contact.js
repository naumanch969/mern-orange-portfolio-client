import express from "express"
const router = express.Router()

import {
    getContactUsers,
    formSubmit,
    deleteWholeCollection
} from "../controllers/contact.js"

 
router.get('/get', getContactUsers)
router.post('/submit', formSubmit)
 
router.delete('/delete-whole-collection',  deleteWholeCollection)

export default router