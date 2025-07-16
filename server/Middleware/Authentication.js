import jwt from 'jsonwebtoken'
export const OnlyUser = async (req, res, next) => {

    try {
        const token = req.cookies.access_token
        if (!token) {
            return next(403, "Unauthorized")
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()

    } catch (error) {
        next(500, error.message)

    }


}
export const OnlyAdmin = async (req, res, next) => {

    try {
        const token = req.cookies.access_token
        if (!token) {
            return next(403, "Unauthorized")
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (decode.role == 'admin') {

            req.user = decode
            next()
        } else {

            return next(403, "Unauthorized")
        }

    } catch (error) {
        next(500, error.message)

    }


}