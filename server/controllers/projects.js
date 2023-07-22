import Projects from "../models/projects.js";


export const getProjectsContent = async (req, res) => {
    try {
        const projectsArr = await Projects.find()
        const projectsObj = projectsArr[0]

        if (!projectsObj) return res.status(200).json({ result: { projectsDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: projectsObj, message: 'projects content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getProjectsContent - projects.js - controllers', error })
    }
}
export const createProjectsContent = async (req, res) => {
    try {
        const { forwardHeading, backHeading, detail, projects } = ['', '', '', []];

        const projectsArr = await Projects.find()
        if (projectsArr.length > 0) return res.status(400).json({ message: 'there should only be one projects document. So this post action can not be proceed.' })

        const result = await Projects.create({ forwardHeading, backHeading, detail, projects })
        res.status(200).json({ result, message: 'projects content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createProjectsContent - projects.js - controllers', error })
    }
}




export const updateForwardHeading = async (req, res) => {
    try {
        const { forwardHeading } = req.body;
        if (!forwardHeading) return res.status(400).json({ message: `forwardHeading field should be provided` })

        const projectsArr = await Projects.find()
        const projectsObj = projectsArr[0]
        const projectsObjId = projectsObj._id
        if (!projectsObj) return res.status(400).json({ message: 'projects document has not been created yet' })

        projectsObj.forwardHeading = forwardHeading
        const result = await Projects.findByIdAndUpdate(projectsObjId, projectsObj, { new: true })
        res.status(200).json({ result: forwardHeading, message: 'forwardHeading of Projects content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateForwardHeading - controllers', error })
    }
}
export const updateBackHeading = async (req, res) => {
    try {
        const { backHeading } = req.body;
        if (!backHeading) return res.status(400).json({ message: `backHeading field should be provided` })

        const projectsArr = await Projects.find()
        const projectsObj = projectsArr[0]
        const projectsObjId = projectsObj._id
        if (!projectsObj) return res.status(400).json({ message: 'projects document has not been created yet' })

        projectsObj.backHeading = backHeading
        const result = await Projects.findByIdAndUpdate(projectsObjId, projectsObj, { new: true })
        res.status(200).json({ result: backHeading, message: 'backHeading of projects content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateBackHeading - controllers', error })
    }
}
export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (!detail) return res.status(400).json({ message: `detail field should be provided` })

        const projectsArr = await Projects.find()
        const projectsObj = projectsArr[0]
        const projectsObjId = projectsObj._id
        if (!projectsObj) return res.status(400).json({ message: 'projects document has not been created yet' })

        projectsObj.detail = detail
        const result = await Projects.findByIdAndUpdate(projectsObjId, projectsObj, { new: true })
        res.status(200).json({ result: detail, message: 'detail of projects content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - controllers', error })
    }
}




export const addProject = async (req, res) => {
    try {
        const { title, technologies, link, github, detail, images } = req.body;
        if (typeof (title) == 'undefined' || typeof (technologies) == 'undefined' || typeof (link) == 'undefined' || typeof (github) == 'undefined' || typeof (detail) == 'undefined' || typeof (images) == 'undefined') return res.status(400).json({ message: `title, technologies, link, detail, images and github fields should be provided` })

        const projectsArr = await Projects.find()
        const projectsObj = projectsArr[0]
        const projectsObjId = projectsObj._id
        if (!projectsObj) return res.status(400).json({ message: 'projects document has not been created yet' })

        projectsObj.projects = projectsObj.projects.concat({ title, technologies, link, github, detail, images })
        await Projects.findByIdAndUpdate(projectsObjId, projectsObj, { new: true })
        res.status(200).json({ result: projectsObj.projects, message: 'project added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addproject - projects.js - controllers', error })
    }
}

export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params
        const { title, technologies, link, github, detail, images } = req.body;
        if (typeof (title) == 'undefined' || typeof (technologies) == 'undefined' || typeof (link) == 'undefined' || typeof (github) == 'undefined' || typeof (detail) == 'undefined' || typeof (images) == 'undefined') return res.status(400).json({ message: `title fields should be provided` })

        const projectsArr = await Projects.find()
        const projectsObj = projectsArr[0]
        const projectsObjId = projectsObj._id
        if (!projectsObj) return res.status(400).json({ message: 'projects document has not been created yet' })

        const findedProject = projectsObj.projects.find((project) => project._id == projectId)
        if (!findedProject) return res.status(400).json({ message: `no project exists with id ${projectId} ` })

        findedProject.title = title
        findedProject.technologies = technologies
        findedProject.link = link
        findedProject.github = github
        findedProject.detail = detail
        findedProject.images = images
        await Projects.findByIdAndUpdate(projectsObjId, projectsObj, { new: true })
        res.status(200).json({ result: findedProject, message: 'project updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateProject - projects.js - controllers', error })
    }
}
export const addProjectImage = async (req, res) => {
    try {
        const { projectId } = req.params
        const { file, url } = req.body;
        if (typeof (file) == 'undefined' || typeof (url) == 'undefined') return res.status(400).json({ message: ` file and url field should be provided` })

        const projectsArr = await Projects.find()
        const projectsObj = projectsArr[0]
        const projectsObjId = projectsObj._id
        if (!projectsObj) return res.status(400).json({ message: 'projects document has not been created yet' })

        const findedProject = projectsObj.projects.find((project) => project._id == projectId)
        if (!findedProject) return res.status(400).json({ message: `no project exists with id ${projectId} ` })

        findedProject.images = findedProject.images.concat({ file, url })
        const result = await Projects.findByIdAndUpdate(projectsObjId, projectsObj, { new: true })
        res.status(200).json({ result: findedProject.images, message: 'detail of projects content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateProject - projects.js - controllers', error })
    }
}
export const deleteProjectImage = async (req, res) => {
    try {
        const { projectId } = req.params
        const { imageId } = req.body;
        if (typeof (imageId) == 'undefined') return res.status(400).json({ message: `imageId field should be provided` })

        const projectsArr = await Projects.find()
        const projectsObj = projectsArr[0]
        const projectsObjId = projectsObj._id
        if (!projectsObj) return res.status(400).json({ message: 'projects document has not been created yet' })

        const findedProject = projectsObj.projects.find((project) => project._id == projectId)
        if (!findedProject) return res.status(400).json({ message: `no project exists with id ${projectId} ` })

        findedProject.images = findedProject.images.filter(image => image._id != imageId)
        await Projects.findByIdAndUpdate(projectsObjId, projectsObj, { new: true })
        res.status(200).json({ result: imageId, message: 'detail of projects content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateProject - projects.js - controllers', error })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params

        const content = await Projects.find()
        const projectsObj = content[0]
        const projectsObjId = projectsObj._id
        if (!projectsObj) return res.status(400).json({ message: 'projects document has not been created yet' })

        const findedProject = projectsObj.projects.find((project) => project._id == projectId)
        if (!findedProject) return res.status(400).json({ message: `no project exists with id ${projectId} ` })

        projectsObj.projects = projectsObj.projects.filter(project => project._id != projectId)
        await Projects.findByIdAndUpdate(projectsObjId, projectsObj, { new: true })
        res.status(200).json({ result: projectsObj.projects, message: 'detail of projects content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateProject - projects.js - controllers', error })
    }
}




export const deleteProjectsCollection = async (req, res) => {
    try {
        const result = await Projects.deleteMany()
        res.status(200).json({ result: { ...result, projectsDocumentNotExist: true }, message: `Projects collection deleted successfully` })
    } catch (error) {
        res.status(500).json({ error, message: "error in deleteProjectsCollection - controllers" })
    }
}