import mongoose from 'mongoose'

const ContactSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
})

const ContactUserModel = new mongoose.model('ContactUser', ContactSchema)
export default ContactUserModel