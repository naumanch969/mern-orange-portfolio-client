import express from "express"
const router = express.Router()

import {
    getFreelancingContent,
    createFreelancingContent,

    updateHeading,
    updateDetail,

    addFeatureCard,
    updateFeatureCard,
    deleteFeatureCard,

    addFreelancingCard,
    updateFreelancingCardTitle,
    updateFreelancingCardDetail,
    addSubFreelancingCard,
    updateSubFreelancingCard,
    deleteSubFreelancingCard,
    deleteFreelancingCard,

    addButton,
    updateButton,
    deleteButton,

    deleteFreelancingCollection
} from "../controllers/freelancing.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"

router.get('/get', adminAuth, getFreelancingContent)
router.post('/create', adminAuth, createFreelancingContent)

router.put('/update-heading', adminAuth, updateHeading)
router.put('/update-detail', adminAuth, updateDetail)

router.put('/add-feature-card', adminAuth, addFeatureCard)
router.put('/update-feature-card/:featureCardId', adminAuth, updateFeatureCard)
router.put('/delete-feature-card/:featureCardId', adminAuth, deleteFeatureCard)

// create
router.put('/add-freelancing-card', adminAuth, addFreelancingCard)
// update
router.put('/freelancing-card/update-title/:freelancingCardId', adminAuth, updateFreelancingCardTitle)
router.put('/freelancing-card/update-detail/:freelancingCardId', adminAuth, updateFreelancingCardDetail)
router.put('/freelancing-card/add-sub-card/:freelancingCardId', adminAuth, addSubFreelancingCard)
router.put('/freelancing-card/update-sub-card/:freelancingCardId', adminAuth, updateSubFreelancingCard)
router.put('/freelancing-card/delete-sub-card/:freelancingCardId', adminAuth, deleteSubFreelancingCard)
// delete
router.put('/delete-freelancing-card/:freelancingCardId', adminAuth, deleteFreelancingCard)

router.put('/add-button', adminAuth, addButton)
router.put('/update-button/:buttonId', adminAuth, updateButton)
router.put('/delete-button/:buttonId', adminAuth, deleteButton)

router.delete('/delete-freelancing-collection', mainAdminAuth, deleteFreelancingCollection)


export default router