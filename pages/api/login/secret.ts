import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body
    if (!token) {
        return res.status(401).json({ message: 'no token' })
    }
    try {
        const decoded = jwt.verify(token, 'hello')
        res.status(200).json({ message: 'success', decoded })
    }
    catch (error) {
        res.status(403).json({ message: 'forbidden' })
    }
}