import jwt from "jsonwebtoken"
import People from "../models/user.js"
export const adminAuth = async (req, res, next) => {
    try {
        if (!req.headers.admin_auth_token && !req.headers.main_admin_auth_token) return res.status(400).json({ message: "login with your email if you are admin." })
        const token = await req.headers.main_admin_auth_token || req.headers.admin_auth_token
        if (token) {
            const decodedData = jwt.verify(token, process.env.AUTH_TOKEN_SECRET_KEY)
            const decodedEmail = decodedData.email;

            const peopleArr = await People.find()
            const peopleObj = peopleArr[0]

            if (!peopleObj) return console.log({ message: 'first document has not been created yet.' })

            const isAdmin = peopleObj.admins.find(admin => admin.email == decodedEmail)
            if (isAdmin) req.admin = decodedEmail

        }
    } catch (error) {
        console.log("error in auth middleware", error)
    }
    next()
}

