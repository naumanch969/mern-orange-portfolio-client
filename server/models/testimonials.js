import mongoose from 'mongoose'

const TestimonialsSchema = mongoose.Schema({
    content: String,
    image: String,
    name: String,
    designation: String
}, { timestamps: true })

const TestimonialsModel = new mongoose.model('Testimonial', TestimonialsSchema)
export default TestimonialsModel