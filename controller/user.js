const { expressError } = require("../middlewares/expressError");
const jwt = require("jsonwebtoken");
const { gentoken } = require("../util/generateToken");
const { userModel } = require("../model/user-model");
let bcrypt = require("bcrypt");

module.exports.userRegister = async(req, res, next) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email });
        console.log(user)

        if (user) {
            return res.status(409).json({ message: "user already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let newuser = await userModel.create({
            fullname,
            password: hashedPassword,
            email
        })
        let token = gentoken(newuser);
        console.log(token);
        res.cookie("token", token);
        res.json({ message: "user created" })

    } catch (error) {
        console.log("error name: ", error.name)
        throw new expressError(error.message, 501)
    }
}


module.exports.userLogin = async(req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.json({ message: "email or password incorrect" });
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = gentoken(user);
                res.cookie("token", token)
                res.json({ message: "you must be logged in" })
            } else {
                res.json({ message: "email or password incorrect" })
            }
        })
    } catch (error) {
        throw new expressError(error.message, 500)
    }
}


module.exports.userLogout = async(req, res) => {
    res.cookie("token", "");
    res.json({ message: "user logout" });
}