const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");


const Authenticate = async (req, res, next) => {
    try {
        console.log("hersdsdsdsdh ")

        const token = req.cookies.jwt
        console.log("here  dikkat h ", token)

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log(" h ")

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })
        console.log("herawaitttttttt h ")

        if (!rootUser) {
            throw new Error("User Not Found")
        }
        req.token = token;
        req.rootUser = rootUser
        req.userId = rootUser._id
        next()
    }
    catch (err) {
        res.status(401).send("Unauthorized User")
        console.log("here in mif=ddle dikkat h ")
    }
}

module.exports = Authenticate