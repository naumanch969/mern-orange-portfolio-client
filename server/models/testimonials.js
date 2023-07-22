import mongoose from 'mongoose'

const TestimonialsSchema = mongoose.Schema({

    forwardHeading: {
        type: String,
    },
    backHeading: {
        type: String,
    },
    detail: {
        type: String,
    },
    testimonials: {
        type: [{
            content: String,
            image: { file: Object, url: String },
            name: String,
            designation: String
        }],
    }
})

const TestimonialsModel = new mongoose.model('Testimonial', TestimonialsSchema)
export default TestimonialsModel