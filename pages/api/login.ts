
import { NextApiRequest, NextApiResponse } from "next";

//import db from test.js
import db from "./db";


interface User {    
    username: string;
    password: string;
    blocked: number;
}

export default async function handler(req: NextApiRequest, res:NextApiResponse){
	const user = {
        username: req.body.username,
        password: req.body.password
   }
   try {
        await db.open();
        const userExist = await db.get(user.username)
		if (!userExist)
			return res.status(400).json({ message: "User not found" });
		else if (userExist) {
            const userExists = userExist as unknown as User
			if (userExists.password === user.password) {
				//if user is blocked
				if (userExists.blocked === 1) {
					res.status(403).json({message: "User is blocked"});
				}
				else {
					res.status(200).json({message: "Login successful"});
				}
			}
			else {
				res.status(401).json({message: "Invalid password"});
			}
		}
    } catch (error) {
		return res.status(401).json({message: "User not found"});
	}	
}