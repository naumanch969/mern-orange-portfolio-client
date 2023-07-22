import express from "express"
const router = express.Router()

import {
    getAboutContent,
    createAboutContent,

    addImage,
    deleteImage,

    updateForwardHeading,
    updateBackHeading,
    updateDetail,
    updateName,
    updateDOB,
    updateAddress,
    updatePhone,
    updateEmail,
    updatesubText,

    addButton,
    updateButton,
    deleteButton,

    deleteAboutCollection
} from "../controllers/about.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"





router.get('/get', adminAuth, getAboutContent)
router.post('/create', adminAuth, createAboutContent)

router.put('/add-image', adminAuth, addImage)
router.put('/delete-image/:imageId', adminAuth, deleteImage)

router.put('/update-forward-heading', adminAuth, updateForwardHeading)
router.put('/update-back-heading', adminAuth, updateBackHeading)
router.put('/update-detail', adminAuth, updateDetail)

router.put('/update-name', adminAuth, updateName)
router.put('/update-DOB', adminAuth, updateDOB)
router.put('/update-address', adminAuth, updateAddress)
router.put('/update-phone', adminAuth, updatePhone)
router.put('/update-email', adminAuth, updateEmail)
router.put('/update-sub-text', adminAuth, updatesubText)


router.put('/add-button', adminAuth, addButton)
router.put('/update-button/:buttonId', adminAuth, updateButton)
router.put('/delete-button/:buttonId', adminAuth, deleteButton)

router.delete('/delete-about-collection', mainAdminAuth, deleteAboutCollection)




export default router