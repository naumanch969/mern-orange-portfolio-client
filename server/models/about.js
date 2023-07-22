import mongoose from 'mongoose'

const AboutSchema = mongoose.Schema({

    images: { type: [{ file: Object, url: String }] },
    forwardHeading: { type: String },
    backHeading: { type: String },
    detail: { type: String },
    name: { type: String },
    DOB: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    subText: { type: String },
    buttons: { type: [{ text: String, variant: String }] },

})

const AboutModel = new mongoose.model('About', AboutSchema)
export default AboutModel