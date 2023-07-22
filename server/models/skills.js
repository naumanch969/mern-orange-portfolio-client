import mongoose from 'mongoose'

const SkillsSchema = mongoose.Schema({

    forwardHeading: {
        type: String,
    },
    backHeading: {
        type: String,
    },
    detail: {
        type: String,
    },
    skills: {
        type: [{
            skill: String,
            percentage: String
        }],
    },
})

const SkillsModel = new mongoose.model('Skill', SkillsSchema)
export default SkillsModel