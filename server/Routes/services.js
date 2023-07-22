import express from "express"
const router = express.Router()

import {
    getServicesContent,
    createServicesContent,

    updateForwardHeading,
    updateBackHeading,
    updateDetail,

    addService,
    updateService,
    deleteService,
    deleteServicesCollection
} from "../controllers/services.js"

import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"






router.get('/get', adminAuth, getServicesContent)
router.post('/create', adminAuth, createServicesContent)

router.put('/update-forward-heading', adminAuth, updateForwardHeading)
router.put('/update-back-heading', adminAuth, updateBackHeading)
router.put('/update-detail', adminAuth, updateDetail)

router.put('/add-service', addService)               // {icon, service, link adminAuth,}     
router.put('/update-service/:serviceId', adminAuth, updateService)
router.put('/delete-service/:serviceId', adminAuth, deleteService)


router.delete('/delete-services-collection', mainAdminAuth, deleteServicesCollection)



export default router