import mongoose from 'mongoose'

const ContactSchema = mongoose.Schema({

    forwardHeading: {
        type: String,
    },
    backHeading: {
        type: String,
    },
    detail: {
        type: String,
    },
    cards: {
        type: [{
            icon: String,           // i.e., home icon
            title: String,          // i.e., Address
            detail: String,         // i.e., Lahore Pakistan
        }],
    },
    images: {
        type: [{ file: Object, url: String }],
    },
    inputs: {
        type: {
            name: String,           // placeholder of input fields
            email: String,
            subject: String,
            message: String
        }
    },
    buttons: {
        type: [{
            text: String,           // Clear
            variant: String         // Outlined
        }]
    }

})

const ContactModel = new mongoose.model('Contact', ContactSchema)
export default ContactModel