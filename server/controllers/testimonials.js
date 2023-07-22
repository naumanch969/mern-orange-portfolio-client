import Testimonials from "../models/testimonials.js";


export const getTestimonialsContent = async (req, res) => {
    try {
        const testimonialsArr = await Testimonials.find()
        const testimonialsObj = testimonialsArr[0]
        if (!testimonialsObj) return res.status(200).json({ result: { testimonialsDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: testimonialsObj, message: 'testimonials content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getTestimonialsContent - testimonials.js - controllers', error })
    }
}


export const createTestimonialsContent = async (req, res) => {
    try {
        const { forwardHeading, backHeading, detail, testimonials } = ['', '', '', []];

        const testimonialsArr = await Testimonials.find()

        if (testimonialsArr.length > 0) return res.status(400).json({ message: 'there should only be one testimonials document. So this post action can not be proceed.' })
        const result = await Testimonials.create({ forwardHeading, backHeading, detail, testimonials })
        res.status(200).json({ result, message: 'testimonials content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createTestimonialsContent - testimonials.js - controllers', error })
    }
}








export const updateForwardHeading = async (req, res) => {
    try {
        const { forwardHeading } = req.body;
        if (typeof (forwardHeading) == 'undefined') return res.status(400).json({ message: `forwardHeading field sould be provided` })

        const testimonialsArr = await Testimonials.find()
        const testimonialsObj = testimonialsArr[0]
        const testimonialsObjId = testimonialsObj._id
        if (!testimonialsObj) return res.status(400).json({ message: 'first testimonials document has not been created yet' })

        testimonialsObj.forwardHeading = forwardHeading
        await Testimonials.findByIdAndUpdate(testimonialsObjId, testimonialsObj, { new: true })
        res.status(200).json({ result: forwardHeading, message: 'forwardHeading of Testimonials content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateForwardHeading - controllers', error })
    }
}

export const updateBackHeading = async (req, res) => {
    try {
        const { backHeading } = req.body;
        if (typeof (backHeading) == 'undefined') return res.status(400).json({ message: `backHeading field sould be provided` })

        const testimonialsArr = await Testimonials.find()
        const testimonialsObj = testimonialsArr[0]
        const testimonialsObjId = testimonialsObj._id
        if (!testimonialsObj) return res.status(400).json({ message: 'testimonials document has not been created yet' })

        testimonialsObj.backHeading = backHeading
        await Testimonials.findByIdAndUpdate(testimonialsObjId, testimonialsObj, { new: true })
        res.status(200).json({ result: backHeading, message: 'backHeading of testimonials content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateBackHeading - controllers', error })
    }
}

export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (typeof (detail) == 'undefined') return res.status(400).json({ message: `detail field sould be provided` })

        const testimonialsArr = await Testimonials.find()
        const testimonialsObj = testimonialsArr[0]
        const testimonialsObjId = testimonialsObj._id
        if (!testimonialsObj) return res.status(400).json({ message: 'testimonials document has not been created yet' })

        testimonialsObj.detail = detail
        await Testimonials.findByIdAndUpdate(testimonialsObjId, testimonialsObj, { new: true })
        res.status(200).json({ result: detail, message: 'detail of testimonials content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - controllers', error })
    }
}






export const addTestimonial = async (req, res) => {
    try {
        const { content, name, designation, image } = req.body;
        if (typeof (content) == 'undefined' || typeof (name) == 'undefined' || typeof (designation) == 'undefined' || typeof (image) == 'undefined') return res.status(400).json({ message: `content, name, designation and image = {file,url} fields sould be provided` })

        const testimonialsArr = await Testimonials.find()
        const testimonialsObj = testimonialsArr[0]
        const testimonialsObjId = testimonialsObj._id
        if (!testimonialsObj) return res.status(400).json({ message: 'testimonials document has not been created yet' })

        testimonialsObj.testimonials = testimonialsObj.testimonials.concat({ content, name, designation, image })
        await Testimonials.findByIdAndUpdate(testimonialsObjId, testimonialsObj, { new: true })
        res.status(200).json({ result: testimonialsObj.testimonials, message: 'testimonial added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addtestimonial - testimonials.js - controllers', error })
    }
}

export const updateTestimonial = async (req, res) => {
    try {
        const { testimonialId } = req.params
        const { content, name, designation, image } = req.body;
        if (typeof (content) == 'undefined' || typeof (name) == 'undefined' || typeof (designation) == 'undefined' || typeof (image) == 'undefined') return res.status(400).json({ message: `content, name, designation, image  fields sould be provided` })

        const testimonialsArr = await Testimonials.find()
        const testimonialsObj = testimonialsArr[0]
        const testimonialsObjId = testimonialsObj._id
        if (!testimonialsObj) return res.status(400).json({ message: 'testimonials document has not been created yet' })

        const findedTestimonial = testimonialsObj.testimonials.find((testimonial) => testimonial._id == testimonialId)
        if (!findedTestimonial) return res.status(400).json({ message: `no testimonial exists with id ${testimonialId} ` })

        findedTestimonial.content = content
        findedTestimonial.name = name
        findedTestimonial.designation = designation
        findedTestimonial.image = image
        await Testimonials.findByIdAndUpdate(testimonialsObjId, testimonialsObj, { new: true })
        res.status(200).json({ result: findedTestimonial, message: `testimonial of id ${testimonialId} of testimonials content updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateTestimonial - testimonials.js - controllers', error })
    }
}

export const deleteTestimonial = async (req, res) => {
    try {
        const { testimonialId } = req.params

        const content = await Testimonials.find()
        const testimonialsObj = content[0]
        const testimonialsObjId = testimonialsObj._id
        if (!testimonialsObj) return res.status(400).json({ message: 'testimonials document has not been created yet' })

        const findedTestimonial = testimonialsObj.testimonials.find((testimonial) => testimonial._id == testimonialId)
        if (!findedTestimonial) return res.status(400).json({ message: `no testimonial exists with id ${testimonialId} ` })

        testimonialsObj.testimonials = testimonialsObj.testimonials.filter(testimonial => testimonial._id != testimonialId)
        await Testimonials.findByIdAndUpdate(testimonialsObjId, testimonialsObj, { new: true })
        res.status(200).json({ result: testimonialsObj.testimonials, message: `testimonial of id ${testimonialId} deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteTestimonial - testimonials.js - controllers', error })
    }
}





export const deleteTestimonialsCollection = async (req, res) => {
    try {
        const result = await Testimonials.deleteMany()
        res.status(200).json({ result: { ...result, testimonialsDocumentNotExist: true }, message: `Testimonials collection deleted successfully` })
    } catch (error) {
        res.status(500).json({ error, message: "error in deleteTestimonialsCollection - controllers" })
    }
}
