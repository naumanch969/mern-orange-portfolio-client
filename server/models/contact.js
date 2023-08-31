import mongoose from 'mongoose'

const ContactSchema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
}, { timestamps: true })

const ContactUserModel = new mongoose.model('ContactUser', ContactSchema)
export default ContactUserModel