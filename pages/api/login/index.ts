
import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken'

//import db from test.js
import db from "./db";
// import secret from "./secret";


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
	// const token = jwt.sign({
	// 		username: user.username,
	// 	}, "hello")
	// res.status(200).json({"token" :token});

   //check if user is not exist in leveldb
   

   	try {
		const userExist = await db.get(user.username)
		if (userExist) {
            const userExists = userExist as unknown as User
			if (userExists.password === user.password) {
				//if user is blocked
				if (userExists.blocked === 1) {
					res.status(403).json({message: "User is blocked"});
				}
				else {
					const token =  {
							token: jwt.sign({
								username: user.username,
							}, "hello")
						}
					res.status(200).json(token);
				}
			}
			else {
				res.status(401).json({message: "Invalid password"});
			}
		}
    } catch (error) {
		return res.status(401).json({message: error})
	}	
}