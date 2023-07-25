const mongoose = require('mongoose')

const contact = mongoose.model("Contact", {
    username: { type: String },
    email: { type: String },
    message: { type: String },
});
module.exports = contact;