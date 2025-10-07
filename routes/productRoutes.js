let express = require("express");
const { upload } = require("../config/multer-config");
const { productModel } = require("../model/product-model");
const { expressError } = require("../middlewares/expressError");
let router = express.Router();

router.get("/", (req, res) => {
    res.send("product")
})

router.post("/create", upload.single("file"), async(req, res) => {
    try {
        let { image, name, price, discount, panelcolor, textcolor } = req.body;
        await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            panelcolor,
            textcolor
        })
        res.json({ message: "product created" })
    } catch (error) {
        throw new expressError(error.message)
    }
})

module.exports.productRouter = router;