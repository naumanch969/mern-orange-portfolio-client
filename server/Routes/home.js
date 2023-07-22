import express from "express"
const router = express.Router()

import {
    getHomeContent,
    createHomeContent,

    updateHelloText,
    addHomeImage,
    deleteHomeImage,
    updateHeading1,
    updateSubHeading1,
    updateHeading2,

    addButton,
    updateButton,
    deleteButton,

    deleteHomeCollection
} from "../controllers/home.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"




router.get('/get', adminAuth, getHomeContent)

router.post('/create', adminAuth, createHomeContent)

router.put('/update-hello-text', adminAuth, updateHelloText)
router.put('/add-home-image', adminAuth, addHomeImage)
router.put('/delete-home-image/:imageId', adminAuth, deleteHomeImage)

router.put('/update-heading1', adminAuth, updateHeading1)
router.put('/update-sub-heading1', adminAuth, updateSubHeading1)
router.put('/update-heading2', adminAuth, updateHeading2)

router.put('/add-button', adminAuth, addButton)
router.put('/update-button/:buttonId', adminAuth, updateButton)
router.put('/delete-button/:buttonId', adminAuth, deleteButton)


router.delete('/delete-home-collection', mainAdminAuth, deleteHomeCollection)




export default router