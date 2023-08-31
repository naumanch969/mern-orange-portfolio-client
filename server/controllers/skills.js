import Skills from "../models/skills.js";
import { createError } from "../utils/error.js";


export const getSkills = async (req, res, next) => {
    try {
        const result = await Skills.find()
        res.status(200).json({ result, message: 'skills fetched successfully', success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}


export const createSkill = async (req, res, next) => {
    try {
        const { skill, percentage } = req.body;
        if (!skill || !percentage) return next(createError(400, 'Make sure to provide all the fields.'))

        const result = await Skills.create({ skill, percentage })
        res.status(200).json({ result, message: 'skill added successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const updateSkill = async (req, res, next) => {
    try {
        const { skillId } = req.params

        const findedSkill = await Skills.findById(skillId)
        if (!findedSkill) return next(createError(400, 'Skiill not exist.'))

        const result = await Skills.findByIdAndUpdate(skillId, { $set: req.body }, { new: true })
        res.status(200).json({ result, message: `skill updated successfully`, success: false })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteSkill = async (req, res, next) => {
    try {
        const { skillId } = req.params

        const findedSkill = await Skills.findById(skillId)
        if (!findedSkill) return next(createError(400, 'Skill not exist.'))

        const result = await Skills.findByIdAndDelete(skillId)
        res.status(200).json({ result, message: `skill deleted successfully`, success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}



export const deleteWholeCollection = async (req, res, next) => {
    try {
        const result = await Skills.deleteMany()
        res.status(200).json({ result, message: `Skills collection deleted successfully`, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}