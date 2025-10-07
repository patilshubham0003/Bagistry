let mongoose = require("mongoose");

let ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minLength: 3
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    product: {
        type: Array,
        default: []
    },
    picture: {
        type: String
    },
    gstin: {
        type: String
    }
})


module.exports.ownerModel = mongoose.model("owner", ownerSchema);