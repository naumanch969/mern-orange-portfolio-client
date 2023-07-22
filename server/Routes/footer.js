import express from "express"
const router = express.Router()

import {
    getFooterContent,
    createFooterContent,

    updateAboutTitle,
    updateAboutDetail,

    updateLinksTitle,
    addLinksLink,
    updateLinksLink,
    deleteLinksLink,

    updateServicesTitle,
    addServicesLink,
    updateServicesLink,
    deleteServicesLink,

    updateContactTitle,
    addContact,
    updateContact,
    deleteContact,

    updateCopyright,
    deleteFooterSection,
} from "../controllers/footer.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"



router.get('/get', adminAuth, getFooterContent)
router.post('/create', adminAuth, createFooterContent)

router.put('/update-about-title', adminAuth, updateAboutTitle)
router.put('/update-about-detail', adminAuth, updateAboutDetail)

router.put('/update-links-title', adminAuth, updateLinksTitle)
router.put('/add-link', adminAuth, addLinksLink)
router.put('/update-link/:linkId', adminAuth, updateLinksLink)
router.put('/delete-link/:linkId', adminAuth, deleteLinksLink)

router.put('/update-services-title', adminAuth, updateServicesTitle)
router.put('/add-service', adminAuth, addServicesLink)
router.put('/update-service/:serviceId', adminAuth, updateServicesLink)
router.put('/delete-service/:serviceId', adminAuth, deleteServicesLink)

router.put('/update-contact-title', adminAuth, updateContactTitle)
router.put('/add-contact', adminAuth, addContact)
router.put('/update-contact/:contactId', adminAuth, updateContact)
router.put('/delete-contact/:contactId', adminAuth, deleteContact)

router.put('/update-copyright', adminAuth, updateCopyright)

router.delete('/delete-footer-section', mainAdminAuth, deleteFooterSection)


export default router