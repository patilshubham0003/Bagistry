const express = require("express");
const app = express();
const path = require("path")
const mongoConnect = require("./config/mongo.js");
const { userRouter } = require("./routes/userRoute.js");
const { ownerRouter } = require("./routes/ownerRoutes.js");
const { productRouter } = require("./routes/productRoutes.js");
require("dotenv").config();
const cors = require("cors");
const { isLoggedIn } = require("./middlewares/isLoggedIn.js");
const { productModel } = require("./model/product-model.js");
const cookieParser = require("cookie-parser");
const { userModel } = require("./model/user-model.js");

app.use(cookieParser())
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")

mongoConnect();


app.use("/user", userRouter);
app.use("/owner", ownerRouter);
app.use("/product", productRouter)


app.get("/", (req, res) => {
    res.json({ message: "hello this is home page" })
})


app.get("/shop", isLoggedIn, async(req, res) => {
    try {
        let products = await productModel.find();
        console.log(products)
        res.json({ products });
    } catch (error) {
        res.json({ message: error.message })
    }
})

app.get("/addtocart/:productId", isLoggedIn, async(req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    console.log(user)
    user.cart.push(req.params.productId);
    await user.save()
    res.json({ message: "product added to cart" });
})

app.get("/cart", isLoggedIn, async(req, res) => {
    let cartProduct = await userModel.findOne({ email: req.user.email }).populate("cart");
    console.log(cartProduct);
    res.json(cartProduct.cart)
})


app.use((err, req, res, next) => {
    const status = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[${status}] ${message}`);

    res.status(status).json({
        success: false,
        message
    });
})

app.listen(3000);