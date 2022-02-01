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

/* userSchema.virtual('coverImagePath').get(function () {
    console.log("Virtual gets called")
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
}) */

const User = mongoose.model("User", userSchema);

module.exports = User;
