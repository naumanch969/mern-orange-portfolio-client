import mongoose from 'mongoose'

const SkillsSchema = mongoose.Schema({
    skill: String,
    percentage: String
}, { timestamps: true })

const SkillsModel = new mongoose.model('Skill', SkillsSchema)
export default SkillsModel