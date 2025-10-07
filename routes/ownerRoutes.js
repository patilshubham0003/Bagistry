let express = require("express");
const { ownerModel } = require("../model/owner-model");
let router = express.Router();




if (process.env.NODE_ENV = "development") {
    router.post("/create", async(req, res) => {
        let { password, fullname, email } = req.body;
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            res.status(503).json({ message: "you dont have permission to create to owner" })
        }
        await ownerModel.create({
            password,
            fullname,
            email
        })
        res.json({ message: "created" }).status(200);
    })
}

router.get("/", (req, res) => {
    res.send("owner")
})

module.exports.ownerRouter = router;