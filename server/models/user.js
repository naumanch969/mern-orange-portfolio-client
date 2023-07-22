import { Schema, model } from "mongoose"

const userSchema = Schema({
    users: [{
        name: String,
        email: String,
        phone: String,
        password: String,
        tokens: [{ name: String, token: String }],
        isSubscribed: Boolean
    }],
    mainAdmin: {
        name: String,
        email: String,
        phone: String,
        tokens: [{ name: String, token: String }]
    },
    admins: [{
        name: String,
        email: String,
        phone: String,
        tokens: [{ name: String, token: String }]
    }]
})
const userSchem = Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    tokens: [{ name: String, token: String }],
    isMainAdmin: Boolean,
    isAdmin: Boolean,
    isSubscribed: Boolean,
})



const userModel = model('User', userSchema)
export default userModel