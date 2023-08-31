import Resumes from "../models/resumes.js";
import { createError } from "../utils/error.js";

export const getResumes = async (req, res, next) => {
    try {
        const result = await Resumes.find()
        res.status(200).json({ result, message: 'resumes content get successfully', success: true})
    } catch (error) {
        next(createError(500, error.message))
    }
}

export const createResume = async (req, res, next) => {
    try {
        const { title, subTitle, detail } = req.body;
        if (!title || !subTitle || !detail) return next(createError(400, 'Make sure to provide all the fields'))

        const result = await Resumes.create({ title, subTitle, detail })
        res.status(200).json({ result, message: 'resume created successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const updateResume = async (req, res, next) => {
    try {
        const { resumeId } = req.params

        const findedResume = await Resumes.findById(resumeId)
        if (!findedResume) return next(createError(500, 'Resume not exist'))

        const result = await Resumes.findByIdAndUpdate(resumeId, { $set: req.body }, { new: true })
        res.status(200).json({ result, message: 'resume updated successfully', success: true})

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteResume = async (req, res, next) => {
    try {
        const { resumeId } = req.params

        const findedResume = await Resumes.findById(resumeId)
        if (!findedResume) return next(createError(500, 'Resume not exist'))

        const result = await Resumes.findByIdAndDelete(resumeId)
        res.status(200).json({ result, message: 'resume deleted successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}






export const deleteWholeCollection = async (req, res, next) => {
    try {
        const result = await Resumes.deleteMany()
        res.status(200).json({ result, message: `Resumes collection deleted successfully`, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}