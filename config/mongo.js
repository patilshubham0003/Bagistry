require("dotenv").config();
const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");


module.exports = () => {
    mongoose
        .connect(process.env.MONGO_KEY)
        .then((res) => debug("connected"))
        .catch((err) => debug(err));
};