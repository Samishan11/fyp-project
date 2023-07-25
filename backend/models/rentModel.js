const mongoose = require('mongoose')

const rentings = mongoose.model("Renting", {
    property: {type: mongoose.Schema.Types.ObjectId, ref: "Property"},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: new Date(Date.now())},
    rented_date: {type: Date},
})

module.exports = rentings