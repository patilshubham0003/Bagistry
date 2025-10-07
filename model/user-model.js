let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        unique: [true, "user alreay exist"]
    },
    password: {
        type: String
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
    },
    picture: {
        type: String
    }
})


module.exports.userModel = mongoose.model("user", userSchema);