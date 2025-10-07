let jwt = require("jsonwebtoken");
const { userModel } = require("../model/user-model");


module.exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.token === undefined || "") {
        return res.json({ message: "you have to logged in" })
    }

    try {
        let decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        let user = await userModel.findOne({ email: decode.email }).select("-password")
        req.user = user;
        next();
    } catch (error) {
        res.json({ message: "something went wrong" })
    }
}