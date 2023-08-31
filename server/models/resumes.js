import mongoose from 'mongoose'

const ResumeSchema = mongoose.Schema({
    title: String,
    subTitle: String,
    detail: String,
 }, { timestamps: true })

const ResumeModel = new mongoose.model('Resume', ResumeSchema)
export default ResumeModel