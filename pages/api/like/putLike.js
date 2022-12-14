import db from "../db";
import { protectUser } from "../middleware/mid";

async function handler(req, res){
   	const data = {
		id: req.body.id,
		url: req.body.url,
		name: req.body.name,
		user: req.user,
	}
	try {
		db.open()
		const user = await db.get(data.user)
		if (user) {
			user.like.push({id: data.id, url: data.url, name: data.name})
			db.put(data.user, user)
			res.status(200).json({message: "image liked"})
		}
		db.close()
    } catch (error) {
		return res.status(401).json("failed to like");
	}	
}

export default protectUser(handler)