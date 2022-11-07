import jwt from 'njsonwebtoken'

export default async function handler(req, res) {
    const { token } = req.body
    const { secret } = req.query
    
    const verified = jwt.verify(token, secret)
    
    if (!verified) {
        return res.status(401).json({ error: 'Invalid token' })
    }
    res.status(200).json(verified)
}