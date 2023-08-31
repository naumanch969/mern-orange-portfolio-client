import mongoose from 'mongoose'

const BlogSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    image: String
}, { timestamps: true })

const BlogModel = new mongoose.model('Blog', BlogSchema)
export default BlogModel