import express from "express"
const router = express.Router()

import {
    formSubmit,

    getContactContent,
    createContactContent,

    updateForwardHeading,
    updateBackHeading,
    updateDetail,

    addContactCard,
    updateContactCard,
    deleteContactCard,

    updateInputs,

    addContactImage,
    deleteContactImage,

    addButton,
    updateButton,
    deleteButton,

    deleteContactCollection
} from "../controllers/contact.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"




router.post('/submit', formSubmit)

router.get('/get', adminAuth, getContactContent)
router.post('/create', adminAuth, createContactContent)

router.put('/update-forward-heading', adminAuth, updateForwardHeading)
router.put('/update-back-heading', adminAuth, updateBackHeading)
router.put('/update-detail', adminAuth, updateDetail)

router.put('/add-contact-card', adminAuth, addContactCard)
router.put('/update-contact-card/:cardId', adminAuth, updateContactCard)
router.put('/delete-contact-card/:cardId', adminAuth, deleteContactCard)


router.put('/add-image', adminAuth, addContactImage)
router.put('/delete-image/:imageId', adminAuth, deleteContactImage)

router.put('/update-inputs', adminAuth, updateInputs)


router.put('/add-button', adminAuth, addButton)
router.put('/update-button/:buttonId', adminAuth, updateButton)
router.put('/delete-button/:buttonId', adminAuth, deleteButton)

router.delete('/delete-contact-collection', mainAdminAuth, deleteContactCollection)


export default router