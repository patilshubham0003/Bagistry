let jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports.gentoken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY)
}