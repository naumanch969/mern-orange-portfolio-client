import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
    title: String,
    technologies: Array,
    link: String,
    github: String,
    detail: String,
    image: String,
}, { timestamps: true })

const ProjectsModel = new mongoose.model('Project', ProjectSchema)
export default ProjectsModel