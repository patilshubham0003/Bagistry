let express = require("express");

let router = express.Router();
const bcrypt = require("bcrypt");

const { userRegister, userLogin, userLogout } = require("../controller/user");
const { userModel } = require("../model/user-model");
const { gentoken } = require("../util/generateToken");
const { expressError } = require("../middlewares/expressError");



router.get("/", (req, res) => {
    res.send("user")
})

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("logout", userLogout)


module.exports.userRouter = router;