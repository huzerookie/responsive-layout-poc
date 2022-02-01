const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    state: String,
    pincode: String,
    image: String,
}, { timestamps: true });

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
