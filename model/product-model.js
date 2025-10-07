let mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: {
        type: String,
    },
    panelcolor: {
        type: String,
    },
    textcolor: {
        type: String,
    }
})


module.exports.productModel = mongoose.model("product", productSchema);