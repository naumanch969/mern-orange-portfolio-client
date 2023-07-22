import jwt from 'jsonwebtoken'

export const userAuth = async (req, res, next) => {
    try {
        if (!req.headers.user_auth_token) return res.status(401).json({ message: 'token not found' })

        const token = await req.headers.user_auth_token

        if (token) {
            const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET_KEY)
            req.userId = decodedToken._id
        }
    }
    catch (err) {
        res.status(401).json({ message: 'authentication failed' })
    }
    next()
}