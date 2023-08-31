import express from "express"
const router = express.Router()

import {
    getServices,
    createService,
    updateService,
    deleteService,
    deleteWholeCollection
} from "../controllers/services.js"

import { verifyToken, verifyAdmin } from "../middleware/auth.js"
 


router.get('/get',  getServices)//verifyToken, verifyAdmin,
router.post('/create',  createService)//verifyToken, verifyAdmin,
router.put('/update/:serviceId',  updateService)//verifyToken, verifyAdmin,
router.delete('/delete/:serviceId',  deleteService)//verifyToken, verifyAdmin,


router.delete('/delete-whole-collection',  deleteWholeCollection)


export default router