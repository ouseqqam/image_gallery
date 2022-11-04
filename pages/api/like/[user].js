import db from "../db";

export default async function handler(req, res){
    const data = req.query.user
	try {
		db.open()
		const user = await db.get("user1")
		if (user) {
			res.status(200).json(user.like)
		}
		db.close()
    } catch (error) {
		res.status(401).json("failed to get likes")
		db.open()
	}
}