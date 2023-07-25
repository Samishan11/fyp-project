const mongoose = require('mongoose');

const comment = mongoose.model("Comment", {
    property: {type: mongoose.Schema.Types.ObjectId, ref: "Property"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    comment: {type: String},
    rating: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    reports: {type: Number , default: 0},
    likedBy: {type: []},
    replies: {type: []},
    isReply: {type: Boolean, default: false},
    date: {type: Date, default: new Date(Date.now())},
});

module.exports = comment;
