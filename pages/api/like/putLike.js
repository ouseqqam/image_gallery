import db from "../db";

export default async function handler(req, res){
   	const data = {
		id: req.body.id,
		url: req.body.url,
		user: req.body.user,
	}
	try {
		db.open()
		const user = await db.get(data.user)
		if (user) {
			user.like.push({id: data.id, url: data.url})
			db.put("user1", user)
			res.status(200).json({message: "image liked"})
		}
		db.close()
    } catch (error) {
		return res.status(401).json("failed to like");
	}	
}

