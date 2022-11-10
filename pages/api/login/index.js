
import jwt from 'jsonwebtoken'

import db from '../db'

export default async function handler(req, res){
	const user = {
        username: req.body.username,
        password: req.body.password
   }
   	try {
		db.open()
		const userExists = await db.get(user.username)
		if (userExists) {
			if (userExists.password === user.password) {
				if (userExists.blocked === 1) {
					res.status(403).json({message: "User is blocked"});
				}
				else {
					const token =  {
							token: jwt.sign({
								username: user.username,
							}, "hello", {expiresIn: "1h"})
						}
					res.status(200).json(token);
				}
			}
			else {
				res.status(401).json({message: "Invalid password"});
			}
		}
		db.close()
    } catch (error) {
		return res.status(401).send({message: "User not found"})
	}	
}