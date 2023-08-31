import mongoose from "mongoose";
import Services from "../models/services.js";
import { createError } from "../utils/error.js";



export const getServices = async (req, res, next) => {
    try {
        const result = await Services.find()
        res.status(200).json({ result, message: 'services get successfully', success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}





export const createService = async (req, res, next) => {
    try {
        const { icon, service, link } = req.body;
        if (!icon || !service || !link) return next(createError(400, 'Make sure to provide all the fields'))

        const result = await Services.create({ icon, service, link })
        res.status(200).json({ result, message: 'service created successfully', success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}

export const updateService = async (req, res, next) => {
    try {
        const { serviceId } = req.params

        const findedService = await Services.findById(serviceId)
        if (!findedService) return next(createError(400, 'Service not exist'))

        const result = await Services.findByIdAndUpdate(serviceId, { $set: req.body }, { new: true })
        res.status(200).json({ result, message: 'service updated successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteService = async (req, res, next) => {
    try {
        const { serviceId } = req.params

        const findedService = await Services.findById(serviceId)
        if (!findedService) return next(createError(400, 'Service not exist'))

        const result = await Services.findByIdAndDelete(serviceId)
        res.status(200).json({ result, message: 'service deleted successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}




export const deleteWholeCollection = async (req, res, next) => {
    try {
        const result = await Services.deleteMany()
        res.status(200).json({ result, message: `Services collection deleted successfully`, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}