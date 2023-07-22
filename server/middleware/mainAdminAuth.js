import jwt from "jsonwebtoken"
import People from "../models/user.js"

// i think the only purpose of middleware is
// to get the token and get the id of the user by decoding token

export const mainAdminAuth = async (req, res, next) => {
    try {


        if (!req.headers.main_admin_auth_token) return res.status(400).json({ message: "subscribe with your email if you are admin." })
        const token = await req.headers.main_admin_auth_token


        if (token) {

            const decodedData = jwt.verify(token, process.env.AUTH_TOKEN_SECRET_KEY)
            const decodedEmail = decodedData.email;

            const contentArr = await People.find()
            const content = contentArr[0]

            if (!content) return console.log({ message: 'first document has not been created yet.' })
            const isMainAdmin = content.mainAdmin.email == decodedEmail
            if (isMainAdmin) req.mainAdmin = decodedEmail

        }
    } catch (error) {
        console.log("error in mainAdminAuth middleware", error)
    }
    next()
}

