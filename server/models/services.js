import mongoose from 'mongoose'

const ServicesSchema = mongoose.Schema({

    forwardHeading: {
        type: String,
    },
    backHeading: {
        type: String,
    },
    detail: {
        type: String,
    },
    services: {
        type: [{
            icon: String,
            service: String,
            link: String
        }],
    },
})

const ServicesModel = new mongoose.model('Service', ServicesSchema)
export default ServicesModel