const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const user = new mongoose.Schema({
    firstName: { type: String, default: '#' },
    lastName: { type: String, default: '#' },
    address: { type: String },
    phone: { type: String, default: "#" },
    email: { type: String, unique: true },

    username: { type: String, unique: [true, "Username already taken"], required: [true, "Username must be provided"] },
    password: { type: String },
    isActive: { type: Boolean, default: false },
    image: { type: String, default: "/files/user/images/default.jpg" },
    isDeleted: { type: Boolean, default: false },
    verified:{
        type:Boolean,
        default:false
    },
    admin:{
        type:Boolean,
        default:false
    },
    // rating: {type: Number, default: 0},
    // total_ratings: {type: Number, default: 0},
    facebookId: { type: String },
    googleId: { type: String },
    // reports: {type: [], default:[]}
});
user.methods.getResetPasswordToken = async function (userId) {
    // Generation Token
    const token = jsonwebtoken.sign({ userId: userId }, "anysecrectkey");
    return token;
}
module.exports = mongoose.model("User", user);