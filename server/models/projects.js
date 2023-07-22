import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({

    forwardHeading: {
        type: String,
    },
    backHeading: {
        type: String,
    },
    detail: {
        type: String,
    },
    projects: {
        type: [{
            title: String,
            technologies: [String],
            link: String,
            github: String,
            detail: String,
            images: [{ file: Object, url: String }],

        }],
    }

})

const ProjectsModel = new mongoose.model('Project', ProjectSchema)
export default ProjectsModel