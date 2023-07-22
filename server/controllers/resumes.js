import Resumes from "../models/resumes.js";

export const getResumesContent = async (req, res) => {
    try {
        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        if (!resumesObj) return res.status(200).json({ result: { resumesDocumentNotExist: true }, message: 'first document has not been created yet.' })

        res.status(200).json({ result: resumesObj, message: 'resumes content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getResumesContent - resumes.js - controllers', error })
    }
}
export const createResumesContent = async (req, res) => {
    try {
        const { forwardHeading, backHeading, detail, resumes, buttons } = ['', '', '', [], []];

        const resumesArr = await Resumes.find()

        if (resumesArr.length > 0) return res.status(400).json({ message: 'there should only be one resumes document. So this post action can not be proceed.' })
        const result = await Resumes.create({ forwardHeading, backHeading, detail, resumes, buttons })
        res.status(200).json({ result, message: 'resumes content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createResumesContent - resumes.js - controllers', error })
    }
}









export const updateForwardHeading = async (req, res) => {
    try {
        const { forwardHeading } = req.body;
        if (typeof (forwardHeading) == 'undefined') return res.status(400).json({ message: `forwardHeading field sould be provided` })

        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'first resumes document has not been created yet' })

        resumesObj.forwardHeading = forwardHeading
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: forwardHeading, message: 'forwardHeading of Resumes content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateForwardHeading - controllers', error })
    }
}

export const updateBackHeading = async (req, res) => {
    try {
        const { backHeading } = req.body;
        if (typeof (backHeading) == 'undefined') return res.status(400).json({ message: `backHeading field sould be provided` })

        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'resumes document has not been created yet' })

        resumesObj.backHeading = backHeading
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: backHeading, message: 'backHeading of resumes content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateBackHeading - controllers', error })
    }
}

export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (typeof (detail) == 'undefined') return res.status(400).json({ message: `detail field sould be provided` })

        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'resumes document has not been created yet' })

        resumesObj.detail = detail
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: detail, message: 'detail of resumes content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - controllers', error })
    }
}





export const addResume = async (req, res) => {
    try {
        const { title, subTitle, detail, date } = req.body;
        if (typeof (title) == 'undefined' || typeof (subTitle) == 'undefined' || typeof (detail) == 'undefined' || typeof (date) == 'undefined') return res.status(400).json({ message: `title, subTitle, detail and date fields sould be provided` })

        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'resumes document has not been created yet' })

        resumesObj.resumes = resumesObj.resumes.concat({ title, subTitle, detail, date })
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: resumesObj.resumes, message: 'detail of resumes content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addResume - resumes.js - controllers', error })
    }
}

export const updateResume = async (req, res) => {
    try {
        const { resumeId } = req.params
        const { title, subTitle, detail, date } = req.body;
        if (typeof (title) == 'undefined' || typeof (subTitle) == 'undefined' || typeof (detail) == 'undefined' || typeof (date) == 'undefined') return res.status(400).json({ message: `title, subTitle, detail and date fields sould be provided` })

        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'resumes document has not been created yet' })

        const findedResume = resumesObj.resumes.find((resume) => resume._id == resumeId)
        if (!findedResume) return res.status(400).json({ message: `no resume exists with id ${resumeId} ` })

        findedResume.title = title
        findedResume.subTitle = subTitle
        findedResume.detail = detail
        findedResume.date = date
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: findedResume, message: 'detail of resumes content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateResume - resumes.js - controllers', error })
    }
}

export const deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params

        const content = await Resumes.find()
        const resumesObj = content[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'resumes document has not been created yet' })

        const findedResume = resumesObj.resumes.find((resume) => resume._id == resumeId)
        if (!findedResume) return res.status(400).json({ message: `no resume exists with id ${resumeId} ` })

        resumesObj.resumes = resumesObj.resumes.filter(resume => resume._id != resumeId)
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: resumesObj.resumes, message: 'detail of resumes content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateResume - resumes.js - controllers', error })
    }
}




export const addButton = async (req, res) => {
    try {
        const { text, variant } = req.body;
        if (typeof (text) == 'undefined' || typeof (variant) == 'undefined') return res.status(400).json({ message: 'text and variant field should be provided' })

        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'resumes document has not been created yet' })

        resumesObj.buttons = resumesObj.buttons.concat({ text, variant })
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: resumesObj.buttons, message: `button of text ${text} of resumes content added successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in addButton - Resumes.js - controllers', error })
    }
}

export const updateButton = async (req, res) => {
    try {
        const { buttonId } = req.params
        const { text, variant } = req.body;
        if (typeof (text) == 'undefined' || typeof (variant) == 'undefined') return res.status(400).json({ message: 'text and variant field should be provided' })

        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'resumes document has not been created yet' })

        const findedButton = resumesObj.buttons.find(button => button._id == buttonId)
        if (!findedButton) return res.status(400).json({ message: `button with id ${buttonId} is not exist`, here: 'erer' })

        findedButton.text = text
        findedButton.variant = variant
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: resumesObj.buttons, message: `button of id ${buttonId} and text ${text} of resumes content updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateButton - Resumes.js - controllers', error })
    }
}

export const deleteButton = async (req, res) => {
    try {
        const { buttonId } = req.params;
        if (!buttonId) return res.status(400).json({ message: 'buttonId should be provided through params' })

        const resumesArr = await Resumes.find()
        const resumesObj = resumesArr[0]
        const resumesObjId = resumesObj._id
        if (!resumesObj) return res.status(400).json({ message: 'resumes document has not been created yet' })

        resumesObj.buttons = resumesObj.buttons.filter(button => button._id != buttonId)
        await Resumes.findByIdAndUpdate(resumesObjId, resumesObj, { new: true })
        res.status(200).json({ result: resumesObj.buttons, message: `button of id ${buttonId} of resumes content deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteButton - Resumes.js - controllers', error })
    }
}




export const deleteResumesCollection = async (req, res) => {
    try {
        const result = await Resumes.deleteMany()
        res.status(200).json({ result: { ...result, resumesDocumentNotExist: true }, message: `Resumes collection deleted successfully` })
    } catch (error) {
        res.status(500).json({ error, message: "error in deleteResumesCollection - controllers" })
    }
}