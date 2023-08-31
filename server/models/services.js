import mongoose from 'mongoose'

const ServicesSchema = mongoose.Schema({
    icon: String,
    service: String,
    link: String
}, { timestamps: true })

const ServicesModel = new mongoose.model('Service', ServicesSchema)
export default ServicesModel