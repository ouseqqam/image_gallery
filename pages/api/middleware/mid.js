import { verify } from "jsonwebtoken"

export const protectUser = handler => (req, res) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.status(401).send("No authorization token")
    }
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).send("No token found")
    }
    try {
        const user = verify(token, "hello")
        req.user = user
        return handler(req, res)
    }
    catch (error) {
        return res.status(401).send("Invalid token")
    }
}