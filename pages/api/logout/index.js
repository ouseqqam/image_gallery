// logout with revoke jwt token


async function handler(req, res){
    res.json({message: "logged out"})
}

export default protectUser(handler)