import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authtoken) return res.status(401).json({ message: 'token not found' })
        const token = await req.headers.authtoken
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedToken
        }
    }
    catch (err) {
        res.status(401).json({ message: 'authentication failed' })
    }
    next()
}

export const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == 'admin') next()
        else next(createError(401, 'Only admin can access this route'))
    })
}