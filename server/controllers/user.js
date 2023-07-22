import User from '../models/user.js'
import OTP from '../models/otp.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import nodemailer from "nodemailer"
import otpGenerator from 'otp-generator'


export const getAllPeople = async (req, res) => {
    try {

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        const subscribers = peopleObj.users.filter(u => u.isSubscribed == true)

        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })


        res.status(200).json({
            length: { users: peopleObj.users.length, subscribers: subscribers.length, admins: peopleObj.admins.length },
            result: peopleObj,
            message: 'all people get successfully',
            success: true
        })

    } catch (error) {
        res.status(404).json({ message: 'error in getAllPeople - people.js - controllers', error, success: false })
    }
}
export const createFirstDocument = async (req, res) => {
    try {
        const { mainAdmin, admin, users } = [{}, [], []];

        const peopleObj = await User.find()
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: true })

        if (peopleObj.length > 0) return res.status(400).json({ message: 'peopleObj object should not be greater than 1. So this post action can not be proceed.', success: false })

        const result = await User.create({ mainAdmin, admin, users })
        res.status(200).json({ result, message: 'first document created successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in createFirstDocuement - people.js - controllers', error, success: false })
    }
}



export const createMainAdmin = async (req, res) => {
    try {

        const { email, name, phone } = req.body;
        if (typeof (email) == 'undefined' || typeof (name) == 'undefined' || typeof (phone) == 'undefined') return res.status(400).json({ message: 'please provide both email and name field ', success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        const peopleObjId = peopleObj._id
        if (!peopleObj) return res.status(200).json({ message: 'first document has not been created yet ', success: true })

        const isMainAdminExist = peopleObj.mainAdmin.email
        if (isMainAdminExist) return res.status(400).json({ message: 'This route can only be used to create main admin and main admin can only be 1. Since the main admin aleady exists so this post action can not be proceed', success: false })

        peopleObj.mainAdmin.name = name
        peopleObj.mainAdmin.email = email
        peopleObj.mainAdmin.phone = phone
        const result = await User.findByIdAndUpdate(peopleObjId, peopleObj, { new: true })
        res.status(200).json({ result, message: 'main admin created successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in createMainAdmin - people.js - controllers', error, success: false })
    }
}
export const updateMainAdmin = async (req, res) => {
    try {
        const { email, name, phone } = req.body;
        if (typeof (email) == 'undefined' || typeof (name) == 'undefined' || typeof (phone) == 'undefined') return res.status(400).json({ message: 'make sure to provide all the fields (email, name, phone) ', success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        const peopleObjId = peopleObj._id
        if (!peopleObj) return res.status(400).json({ message: 'first document has not been created yet.', success: false })

        peopleObj.mainAdmin.email = email;
        peopleObj.mainAdmin.name = name;
        peopleObj.mainAdmin.phone = phone;
        const result = await User.findByIdAndUpdate(peopleObjId, peopleObj, { new: true })
        res.status(200).json({ result, message: 'main admin updated successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in updateMainAdmin - people.js - controllers', error, success: false })
    }
}





export const addAdmin = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (typeof (email) == 'undefined' || typeof (name) == 'undefined' || typeof (phone) == 'undefined') return res.status(400).json({ message: 'make sure to provide all the fields (name, email, phone) ', success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        const peopleObjId = peopleObj._id
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const isEmailExist = peopleObj.admins.find((admin) => admin.email == email)
        if (isEmailExist) return res.status(400).json({ message: `Admin with email ${email} already exist.Please enter another email.`, success: false })

        const isNameExist = peopleObj.admins.find((admin) => admin.name == name)
        if (isNameExist) return res.status(400).json({ message: `Admin with name ${name} already exist.Please enter another name.`, success: false })

        const newAdmin = { email, name, phone }
        peopleObj.admins = peopleObj.admins.concat(newAdmin)
        const result = await User.findByIdAndUpdate(peopleObjId, peopleObj, { new: true })
        res.status(200).json({ result, message: 'first admin added successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in addAdmin - people.js - controllers', error, success: false })
    }
}
export const updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params
        const { name, email, phone } = req.body;
        if (typeof (email) == 'undefined' || typeof (name) == 'undefined' || typeof (phone) == 'undefined') return res.status(400).json({ message: 'make sure to provide all the fields (name, email, phone) ', success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        const peopleObjId = peopleObj._id
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const findedAdmin = peopleObj.admins.find(adm => adm._id == adminId)
        if (!findedAdmin) return res.status(400).json({ message: `no admin exist with id ${adminId}`, success: false })

        // add a case that each admin can change only it's own data.   --->    req.admin == findedAdmin.email
        findedAdmin.name = name
        findedAdmin.email = email
        findedAdmin.phone = phone

        const result = await User.findByIdAndUpdate(peopleObjId, peopleObj, { new: true })
        res.status(200).json({ result, message: `admin ${findedAdmin.name} updated successfully`, success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in updateAdmin - people.js - controllers', error, success: false })
    }
}
export const deleteAdmin = async (req, res) => {
    try {
        const { email } = req.body;

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        const peopleObjId = peopleObj._id
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const findedAdmin = peopleObj.admins.find(adm => adm.email == email)
        if (!findedAdmin) return res.status(400).json({ message: `no admin exist with _id ${email}`, success: false })

        peopleObj.admins = peopleObj.admins.filter(a => a.email !== email)
        const result = await User.findByIdAndUpdate(peopleObjId, peopleObj, { new: true })
        res.status(200).json({ result, message: `admin ${email} deleted successfully`, success: true })


    } catch (error) {
        res.status(404).json({ message: 'error in deleteAdmin - people.js - controllers', error, success: false })
    }
}




export const sendRegisterOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'email field is required', success: false })
        if (!validator.isEmail(email)) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const isEmailAlreadyReg = peopleObj.users.find(user => user.email == email)
        // in register user should not be registered already
        if (isEmailAlreadyReg) return res.status(400).json({ message: `user with email ${email} already resgistered `, success: false })


        const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        const hashedOTP = await bcrypt.hash(otp, 12)
        const newOTP = await OTP.create({ email, otp: hashedOTP, name: 'register_otp' })

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Verification',
            html: `
        <div style="background-color: #F7F7F7; padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="text-align: center; color: #4CAF50;">Verification</h1>
            <p style="font-size: 16px;">Your OTP code is <strong>${otp}</strong></p>
        </div>
    `
        };

        transporter.sendMail(mailOptions, function (err, info) {
        });

        res.status(200).json({ result: newOTP, otp, message: 'register_otp send successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'error in sendRegisterOTP - controllers/user.js', error, success: false })
    }
}
export const register = async (req, res) => {
    try {
        const { name, email, phone, password, otp } = req.body

        if (!name || !email || !phone || !password || !otp) return res.status(400).json({ message: 'make sure to provide all the fieds (name, email, phone, password, otp)', success: false })
        if (!validator.isEmail(email)) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const otpHolder = await OTP.find({ email })
        if (otpHolder.length == 0) return res.status(400).json({ message: 'you have entered an exired otp', success: false })

        const register_otps = otpHolder.filter(otp => otp.name == 'register_otp')
        const findedOTP = register_otps[register_otps.length - 1]           // otp may be sent multiple times to the user. So there may be multiple otps with user email stored in dbs. But we need only last one.

        const plainOTP = otp
        const hashedOTP = findedOTP.otp

        const isOTPCorrect = await bcrypt.compare(plainOTP, hashedOTP)
        if (!isOTPCorrect) return res.status(200).json({ message: 'wrong otp', success: false, success: true })

        const hashedPassword = await bcrypt.hash(password, 12)
        peopleObj.users = peopleObj.users.concat({ name, email, phone, password: hashedPassword, tokens: [] })
        await User.findByIdAndUpdate(peopleObj._id, peopleObj, { new: true })

        await OTP.deleteMany({ email: findedOTP.email })
        return res.status(200).json({ result: { name, email, phone, password: hashedPassword, tokens: [] }, message: 'register successfully', success: true })

    }
    catch (error) {
        res.status(404).json({ message: 'error in register - controllers/user.js', error, success: false })
    }
}
export const login = async (req, res) => {
    try {
        const user_auth_token = 'user_auth_token'
        const admin_auth_token = 'admin_auth_token'
        const main_admin_auth_token = 'main_admin_auth_token'
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'make sure to provide all fields (email, password) ', success: false })

        const emailValidationFailed = !validator.isEmail(email)
        if (emailValidationFailed) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const existingUser = peopleObj.users.find(user => user.email == email)
        if (!existingUser) return res.status(400).json({ message: `Invalid Credentials`, success: false })

        const plainPassword = password
        const hashedPassword = existingUser.password

        const isPasswordCorrect = await bcrypt.compare(plainPassword, hashedPassword)
        if (!isPasswordCorrect) return res.status(400).json({ message: `Invalid Credentials`, success: false })

        const isTokenExist = Boolean(existingUser.tokens.find(token => token.name == user_auth_token))
        if (isTokenExist) return res.status(201).json({ result: existingUser, message: `user with email ${email} already loged in`, success: true })

        const isMainAdmin = peopleObj.mainAdmin.email == email
        const isAdmin = Boolean(peopleObj.admins.find(admin => admin.email == email))
        const isUser = Boolean(existingUser)

        let userToken, adminToken, mainAdminToken;
        if (isMainAdmin) {
            mainAdminToken = jwt.sign({ email, password, _id: existingUser._id }, process.env.AUTH_TOKEN_SECRET_KEY)
            const tokenObj = { name: main_admin_auth_token, token: mainAdminToken }
            existingUser.tokens = existingUser.tokens.concat(tokenObj)
            existingUser.isSubscribed = true
        }
        if (isAdmin) {
            adminToken = jwt.sign({ email, password, _id: existingUser._id }, process.env.AUTH_TOKEN_SECRET_KEY)
            const tokenObj = { name: admin_auth_token, token: adminToken }
            existingUser.tokens = existingUser.tokens.concat(tokenObj)
            existingUser.isSubscribed = true
        }
        userToken = jwt.sign({ email, password, _id: existingUser._id }, process.env.AUTH_TOKEN_SECRET_KEY)
        const tokenObj = { name: user_auth_token, token: userToken }
        existingUser.tokens = existingUser.tokens.concat(tokenObj)


        const result = await User.findByIdAndUpdate(peopleObj._id, peopleObj, { new: true })


        res.status(200).json({ result: existingUser, resulted: result, message: 'login successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'login failed - controllers/user.js', error, success: false })
        console.log(`error`, error)
    }
}
export const logout = async (req, res) => {
    try {
        const { email } = req.body;

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const findedUser = peopleObj.users.find(u => u.email == email)
        if (!findedUser) return res.status(400).json({ message: `user with email ${email} is not exist `, success: false })

        findedUser.tokens = []

        const result = await User.findByIdAndUpdate(peopleObj._id, peopleObj, { new: true })
        return res.status(200).json({ result, message: 'user logout successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'error in logout - controllers/user.js', error, success: false })
    }
}
export const sendForgetPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const isEmailAlreadyReg = peopleObj.users.find(user => user.email == email)

        if (!email) return res.status(400).json({ message: 'email field is required', success: false })
        // in forget password route, user should be registered already
        if (!isEmailAlreadyReg) return res.status(400).json({ message: `no user exist with email ${email}`, success: false })
        if (!validator.isEmail(email)) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        const hashedOTP = await bcrypt.hash(otp, 12)
        const newOTP = await OTP.create({ email, otp: hashedOTP, name: 'forget_password_otp' })

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Verification',
            html: `<p>Your OTP code is ${otp}</p>`      // all data to be sent
        };
        transporter.sendMail(mailOptions, function (err, info) {
        });


        res.status(200).json({ result: newOTP, otp, message: 'forget_password_otp send successfully', success: true })

    }
    catch (error) {
        res.status(404).json({ message: 'error in sendForgetPasswordOTP - controllers/user.js', error, success: false })
    }
}
export const changePassword = async (req, res) => {
    try {

        const { email, password, otp } = req.body
        if (!email || !password || !otp) return res.status(400).json({ message: 'make sure to provide all the fieds ( email, password, otp)', success: false })
        if (!validator.isEmail(email)) return res.status(400).json({ message: `email pattern failed. Please provide a valid email.`, success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const findedUser = peopleObj.users.find(user => user.email == email)
        if (!findedUser) return res.status(400).json({ message: `user with email ${email} is not exist `, success: false })


        const otpHolder = await OTP.find({ email })
        if (otpHolder.length == 0) return res.status(400).json({ message: 'you have entered an expired otp', success: false })

        const forg_pass_otps = otpHolder.filter(otp => otp.name == 'forget_password_otp')         // otp may be sent multiple times to user. So there may be multiple otps with user email stored in dbs. But we need only last one.
        const findedOTP = forg_pass_otps[forg_pass_otps.length - 1]

        const plainOTP = otp
        const hashedOTP = findedOTP.otp

        const isOTPCorrect = await bcrypt.compare(plainOTP, hashedOTP)
        if (!isOTPCorrect) return res.status(200).json({ message: 'wrong otp', success: false })

        const hashedPassword = await bcrypt.hash(password, 12)
        findedUser.email = email
        findedUser.password = hashedPassword
        const result = await User.findByIdAndUpdate(peopleObj._id, peopleObj, { new: true })

        await OTP.deleteMany({ email: findedOTP.email })
        return res.status(200).json({ result, message: 'password changed successfully', success: true })

    }
    catch (error) {
        res.status(404).json({ message: 'error in changePassword - controllers/user.js', error, success: false })
    }
}
export const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const findedUser = peopleObj.users.find(u => u.email == email)
        if (!findedUser) return res.status(400).json({ message: `user with email ${email} is not exist `, success: false })
        // if (findedUser.email == peopleObj.mainAdmin.email) return res.status(400).json({ message: `main admin can not be deleted`, success: false })

        peopleObj.users = peopleObj.users.filter(u => u.email != email)
        const result = await User.findByIdAndUpdate(peopleObj._id, peopleObj, { new: true })
        return res.status(200).json({ result, message: 'user deleted successfully', success: true })
    }
    catch (error) {
        res.status(404).json({ message: 'error in deleteUser - controllers/user.js', error, success: false })
    }
}




export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'email field is required', success: false })

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        const peopleObjId = peopleObj._id
        if (!peopleObj) return res.status(200).json({ result: { peopleDocumentNotExist: true }, message: 'first document has not been created yet.', success: false })

        const findedUser = peopleObj.users.find(user => user.email == email)
        const isAlreadySubscribed = findedUser.isSubscribed
        if (isAlreadySubscribed) return res.status(400).json({ message: 'You have already subscribed', success: false })

        findedUser.isSubscribed = true
        const result = await User.findByIdAndUpdate(peopleObjId, peopleObj, { new: true })
        res.status(200).json({ result, message: 'you are subscribed successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in subscribe - people.js - controllers', error, success: false })
    }
}
export const unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;

        const peopleArr = await User.find()
        const peopleObj = peopleArr[0]
        const peopleObjId = peopleObj._id
        if (!peopleObj) return res.status(400).json({ message: 'first document has not been created yet.', success: false })

        const findedUser = peopleObj.users.find(user => user.email == email)

        const isAlreadySubscribed = findedUser.isSubscribed
        if (!isAlreadySubscribed) return res.status(400).json({ message: 'You have already unsubscribed', success: false })

        // const isMainAdmin = peopleObj.mainAdmin.email == email
        // const isAdmin = peopleObj.admins.find(a => a.email == email)

        findedUser.isSubscribed = false
        const result = await User.findByIdAndUpdate(peopleObjId, peopleObj, { new: true })
        res.status(200).json({ result, message: 'you are unsubscribed successfully', success: true })

    } catch (error) {
        res.status(404).json({ message: 'error in subscribe - people.js - controllers', error, success: false })
    }
}





export const deletePeopleCollection = async (req, res) => {
    try {

        const result = await User.deleteMany()
        res.status(200).json({ result: { ...result, peopleDocumentNotExist: true }, message: `User collection deleted successfully`, success: true })


    } catch (error) {
        res.status(500).json({ error, message: "error in deletePeopleCollection - controllers", success: false })
    }
}