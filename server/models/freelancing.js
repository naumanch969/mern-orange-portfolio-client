import mongoose from 'mongoose'

const FreelancingSchema = mongoose.Schema({
    title: String,
    link: String,
    description: String,
    category: String,
    image: String,
    parent: { type: String, enum: ['fiverr', 'upwork', 'freelancer'] }
}, { timestamps: true })

const FreelancingModel = new mongoose.model('Freelancing', FreelancingSchema)
export default FreelancingModel