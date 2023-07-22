import express from "express"
const router = express.Router()

import {
    getNavbarContent,
    createNavbarContent,

    updateLogo,

    addNavLink,
    updateNavLink,
    deleteNavLink,

    addSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    deleteNavbarCollection
} from "../controllers/navbar.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"



router.get('/get', adminAuth, getNavbarContent)
router.post('/create', adminAuth, createNavbarContent)

router.put('/update-logo', adminAuth, updateLogo)

router.put('/add-navlink', adminAuth, addNavLink)
router.put('/update-navlink/:navLinkId', adminAuth, updateNavLink)
router.put('/delete-navlink/:navLinkId', adminAuth, deleteNavLink)

router.put('/add-social-media', adminAuth, addSocialMedia)
router.put('/update-social-media/:socialId', adminAuth, updateSocialMedia)
router.put('/delete-social-media/:socialId', adminAuth, deleteSocialMedia)


router.delete('/delete-navbar-collection', mainAdminAuth, deleteNavbarCollection)


export default router