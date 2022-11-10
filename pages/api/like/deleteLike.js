import db from "../db";
import { protectUser } from "../middleware/mid";

async function handler(req, res){
   	const data = {
		id: req.body.id,
		user: req.user,
	}
	try {
		db.open()
		const user = await db.get(data.user)
		if (user) {
			user.like = user.like.filter((like) => like.id != data.id)
			db.put(data.user, user)
		}
		res.status(200).json({ message: "Like deleted" })
		db.close()
    } catch (error) {
		return res.status(401).json("failed to unlike");
	}
}

export default protectUser(handler)