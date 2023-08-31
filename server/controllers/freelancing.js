import Freelancing from "../models/freelancing.js";
import { createError } from "../utils/error.js";


export const getCards = async (req, res, next) => {
    try {
        const result = await Freelancing.find()
        res.status(200).json({ result, message: 'freelancing cards get successfully', success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}


export const createCard = async (req, res, next) => {
    try {
        const { title, link, description, category, image, parent } = req.body;
        if (!title || !link || !description || !category || !parent) return next(createError(400, 'Make sure to provide all the fields.'))

        const result = await Freelancing.create({ title, link, description, category, image: image, parent })
        res.status(200).json({ result, message: `freelancing card created successfully `, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}
export const updateCard = async (req, res, next) => {
    try {
        const { cardId } = req.params

        const findedFreelancingCard = await Freelancing.findById(cardId)
        if (!findedFreelancingCard) return next(createError(400, 'Card not exist'))

        const result = await Freelancing.findByIdAndUpdate(cardId, { $set: req.body }, { new: true })
        res.status(200).json({ result, message: `freelancing card updated successfully`, success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const deleteCard = async (req, res, next) => {
    try {
        const { cardId } = req.params

        const findedFreelancingCard = await Freelancing.findById(cardId)
        if (!findedFreelancingCard) return next(createError(400, 'Card not exist'))

        const result = await Freelancing.findByIdAndDelete(cardId)
        res.status(200).json({ result, message: `freelancing card deleted successfully `, success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}



export const deleteWholeCollection = async (req, res, next) => {
    try {
        const result = await Freelancing.deleteMany()
        res.status(200).json({ result, message: `Freelancing collection deleted successfully`, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}