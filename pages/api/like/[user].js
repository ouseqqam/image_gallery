import db from "../db";
import { protectUser } from "../middleware/mid";

const  handler = async (req, res) => {
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

export default protectUser(handler)