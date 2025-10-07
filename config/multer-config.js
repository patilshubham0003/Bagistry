const multer = require("multer")
const crypto = require("crypto");
const path = require("path");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, './public/images')
    },
    filename: function(req, file, cb) {
        uq = crypto.randomBytes(12).toString("hex")
        return cb(null, file.fieldname + '-' + uq + path.extname(file.originalname))
    }
})

module.exports.upload = multer({ storage: storage })