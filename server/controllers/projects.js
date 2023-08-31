import Projects from "../models/projects.js";
import { createError } from "../utils/error.js";




export const getProjects = async (req, res, next) => {
    try {
        const result = await Projects.find()
        res.status(200).json({ result, message: 'project added successfully', success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}

export const createProject = async (req, res, next) => {
    try {
        const { title, technologies, link, github, detail, image } = req.body;
        if (!title || !technologies || !link || !github || !detail) return next(createError(400, 'Make sure to provide all the fields.'))

        const result = await Projects.create({ title, technologies, link, github, detail, image })
        res.status(200).json({ result, message: 'project created successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const updateProject = async (req, res, next) => {
    try {
        const { projectId } = req.params

        const findedProject = await Projects.findById(projectId)
        if (!findedProject) return next(createError(400, 'Project not exist.'))

        const result = await Projects.findByIdAndUpdate(projectId, { $set: req.body }, { new: true })
        res.status(200).json({ result, message: 'project updated successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteProject = async (req, res, next) => {
    try {
        const { projectId } = req.params

        const findedProject = await Projects.findById(projectId)
        if (!findedProject) return next(createError(400, 'Project not exist.'))

        const result = await Projects.findByIdAndDelete(projectId)
        res.status(200).json({ result, message: 'project deleted successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}




export const deleteWholeCollection = async (req, res, next) => {
    try {
        const result = await Projects.deleteMany()
        res.status(200).json({ result, message: `Projects collection deleted successfully`, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}