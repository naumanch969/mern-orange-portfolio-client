import { Schema, model } from "mongoose"

const userSchema = Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    image: String,
    role: { type: String, default: 'user', enum: ['user',  'admin'] }
}, { timestamps: true })

const userModel = model('User', userSchema)
export default userModel