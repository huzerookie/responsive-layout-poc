const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
}, { timestamps: true });
const User = mongoose.model("User", userSchema);

module.exports = User;
