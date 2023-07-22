import Skills from "../models/skills.js";


export const getSkillsContent = async (req, res) => {
    try {
        const skillsArr = await Skills.find()
        const skillsObj = skillsArr[0]

        if (!skillsObj) return res.status(200).json({ result: { skillsDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: skillsObj, message: 'skills content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getSkillsContent - skills.js - controllers', error })
    }
}
export const createSkillsContent = async (req, res) => {
    try {
        const { forwardHeading, backHeading, detail, skills } = ['', '', '', []];

        const skillsArr = await Skills.find()
        if (skillsArr.length > 0) return res.status(400).json({ message: 'there should only be one skills document. So this post action can not be proceed.' })

        const result = await Skills.create({ forwardHeading, backHeading, detail, skills })
        res.status(200).json({ result, message: 'skills content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createSkillsContent - skills.js - controllers', error })
    }
}






export const updateForwardHeading = async (req, res) => {
    try {
        const { forwardHeading } = req.body;
        if (!forwardHeading) return res.status(400).json({ message: `forwardHeading field sould be provided` })

        const skillsArr = await Skills.find()
        const skillsObj = skillsArr[0]
        const skillsObjId = skillsObj._id
        if (!skillsObj) return res.status(400).json({ message: 'first skills document has not been created yet' })

        skillsObj.forwardHeading = forwardHeading
        await Skills.findByIdAndUpdate(skillsObjId, skillsObj, { new: true })
        res.status(200).json({ result: forwardHeading, message: 'forwardHeading of Skills content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateForwardHeading - controllers', error })
    }
}

export const updateBackHeading = async (req, res) => {
    try {
        const { backHeading } = req.body;
        if (!backHeading) return res.status(400).json({ message: `backHeading field sould be provided` })

        const skillsArr = await Skills.find()
        const skillsObj = skillsArr[0]
        const skillsObjId = skillsObj._id
        if (!skillsObj) return res.status(400).json({ message: 'skills document has not been created yet' })

        skillsObj.backHeading = backHeading
        await Skills.findByIdAndUpdate(skillsObjId, skillsObj, { new: true })
        res.status(200).json({ result: backHeading, message: 'backHeading of skills content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateBackHeading - controllers', error })
    }
}

export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (!detail) return res.status(400).json({ message: `detail field sould be provided` })

        const skillsArr = await Skills.find()
        const skillsObj = skillsArr[0]
        const skillsObjId = skillsObj._id
        if (!skillsObj) return res.status(400).json({ message: 'skills document has not been created yet' })

        skillsObj.detail = detail
        await Skills.findByIdAndUpdate(skillsObjId, skillsObj, { new: true })
        res.status(200).json({ result: detail, message: 'detail of skills content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - controllers', error })
    }
}






export const addSkill = async (req, res) => {
    try {
        const { skill, percentage } = req.body;
        if (typeof (percentage) == 'undefined' || typeof (skill) == 'undefined') return res.status(400).json({ message: `percentage, skill fields sould be provided` })

        const skillsArr = await Skills.find()
        const skillsObj = skillsArr[0]
        const skillsObjId = skillsObj._id
        if (!skillsObj) return res.status(400).json({ message: 'skills document has not been created yet' })

        skillsObj.skills = skillsObj.skills.concat({ percentage, skill })
        await Skills.findByIdAndUpdate(skillsObjId, skillsObj, { new: true })
        res.status(200).json({ result: skillsObj.skills, message: 'skill added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addskill - skills.js - controllers', error })
    }
}

export const updateSkill = async (req, res) => {
    try {
        const { skillId } = req.params
        const { skill, percentage } = req.body;
        if (typeof (percentage) == 'undefined' || typeof (skill) == 'undefined') return res.status(400).json({ message: `skill, percentage fields sould be provided` })

        const skillsArr = await Skills.find()
        const skillsObj = skillsArr[0]
        const skillsObjId = skillsObj._id
        if (!skillsObj) return res.status(400).json({ message: 'skills document has not been created yet' })

        const findedSkill = skillsObj.skills.find((skill) => skill._id == skillId)
        if (!findedSkill) return res.status(400).json({ message: `no skill exists with id ${skillId} ` })

        findedSkill.skill = skill
        findedSkill.percentage = percentage
        await Skills.findByIdAndUpdate(skillsObjId, skillsObj, { new: true })
        res.status(200).json({ result: findedSkill, message: `skill of id ${skillId} of skills content updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateSkill - skills.js - controllers', error })
    }
}

export const deleteSkill = async (req, res) => {
    try {
        const { skillId } = req.params

        const content = await Skills.find()
        const skillsObj = content[0]
        const skillsObjId = skillsObj._id
        if (!skillsObj) return res.status(400).json({ message: 'skills document has not been created yet' })

        const findedSkill = skillsObj.skills.find((skill) => skill._id == skillId)
        if (!findedSkill) return res.status(400).json({ message: `no skill exists with id ${skillId} ` })

        skillsObj.skills = skillsObj.skills.filter(skill => skill._id != skillId)
        await Skills.findByIdAndUpdate(skillsObjId, skillsObj, { new: true })
        res.status(200).json({ result: skillsObj.skills, message: `skill deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteSkill - skills.js - controllers', error })
    }
}



export const deleteSkillsCollection = async (req, res) => {
    try {
        const result = await Skills.deleteMany()
        res.status(200).json({ result: { ...result, skillsDocumentNotExist: true }, message: `Skills collection deleted successfully` })
    } catch (error) {
        res.status(500).json({ error, message: "error in deleteSkillsCollection - controllers" })
    }
}