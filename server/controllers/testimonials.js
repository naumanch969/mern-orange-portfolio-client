import Testimonials from "../models/testimonials.js";
import { createError } from "../utils/error.js";


export const getTestimonials = async (req, res, next) => {
    try {
        const result = await Testimonials.find()
        res.status(200).json({ result, message: 'testimonials content get successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}


export const createTestimonial = async (req, res, next) => {
    try {
        const { content, name, designation, image } = req.body;
        if (!content || !name || !designation) return next(createError(400, 'Make sure to provide all the fields'))

        const result = await Testimonials.create({ content, name, designation, image })
        res.status(200).json({ result, message: 'testimonial added successfully', success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const updateTestimonial = async (req, res, next) => {
    try {
        const { testimonialId } = req.params

        const findedTestimonial = await Testimonials.findById(testimonialId)
        if (!findedTestimonial) return next(createError(400, 'Testimonial not exist'))

        const result = await Testimonials.findByIdAndUpdate(testimonialId, { $set: req.body }, { new: true })
        res.status(200).json({ result, message: `testimonial updated successfully`, success: false })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteTestimonial = async (req, res, next) => {
    try {
        const { testimonialId } = req.params

        const findedTestimonial = await Testimonials.findById(testimonialId)
        if (!findedTestimonial) return next(createError(400, 'Testimonial not exist'))

        const result = await Testimonials.findByIdAndDelete(testimonialId)
        res.status(200).json({ result, message: `testimonial deleted successfully`, success: true })

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {
        const result = await Testimonials.deleteMany()
        res.status(200).json({ result: { ...result, testimonialsDocumentNotExist: true }, message: `Testimonials collection deleted successfully`, success: true })
    } catch (error) {
        next(createError(500, error.message))
    }
}
