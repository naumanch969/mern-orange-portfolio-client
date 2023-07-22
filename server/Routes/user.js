import {
    getAllPeople,
    createFirstDocument,

    createMainAdmin,
    updateMainAdmin,

    subscribe,
    unsubscribe,


    addAdmin,
    updateAdmin,
    deleteAdmin,


    sendRegisterOTP,
    register,
    login,
    logout,
    sendForgetPasswordOTP,
    changePassword,
    deleteUser,

    deletePeopleCollection,
} from "../controllers/user.js"

import express from "express"

const router = express.Router()
import { adminAuth } from "../middleware/adminAuth.js"
import { mainAdminAuth } from "../middleware/mainAdminAuth.js"




router.get('/get', getAllPeople)    // adminAuth,
router.post('/create-first-document', createFirstDocument)


// main admin
router.put('/create-main-admin', createMainAdmin)
router.put('/update-main-admin', mainAdminAuth, updateMainAdmin)

// subscribers
router.put('/subscribe', subscribe)
router.put('/unsubscribe', unsubscribe)

// admins
router.put('/add-admin', mainAdminAuth, addAdmin)                   // this require authentication   
router.put('/update-admin/:adminId', mainAdminAuth, updateAdmin)
router.put('/delete-admin', mainAdminAuth, deleteAdmin)

// users
router.post('/send-register-otp', sendRegisterOTP)
router.post('/register', register)
router.put('/login', login)
router.put('/logout', logout)
router.post('/send-forget-pass-otp', sendForgetPasswordOTP)
router.put('/change-password', changePassword)
router.put('/delete-user', deleteUser)


router.delete('/delete-people-collection', mainAdminAuth, deletePeopleCollection)//   








export default router
