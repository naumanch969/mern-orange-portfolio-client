import User from '../models/user.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import nodemailer from "nodemailer"


export const getUsers = async (req, res, next) => {
    try {

        const users = await User.find()
        return res.status(200).json({ result: users, message: 'all user get successfully', success: true })

    } catch (error) {
        return res.status(404).json({ message: 'error in getUsers - user.js - controllers', error, success: false })
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const findedUser = await User.findById(userId)
        if (!findedUser) return res.status(204).json({ message: 'user not exist', success: false })
        if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)

        const body = req.body
        delete body._id

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: body }, { new: true })
        return res.status(200).json({ result: updatedUser, message: 'user updated successfully!', success: true })
    } catch (error) {
         return res.status(404).json({ message: 'error in updateUser - controllers/user.js', error, success: false })
    }
}


export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await User.deleteMany()
        return res.status(200).json({ result, message: `User collection deleted successfully`, success: true })

    } catch (error) {
        return res.status(500).json({ error, message: "error in deleteUserCollection - controllers", success: false })
    }
}