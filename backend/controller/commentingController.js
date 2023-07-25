const { request } = require("express");
const comment = require("../models/commentModel");
const property = require("../models/propertyModel");
const contactModal = require('../models/contact');
exports.postReview = async (req, res) => {
    console.log('dsafsda')
    const property_ = await property.findById(req.params.propertyId);
    var avg = property_.rating;
    var count = property_.total_ratings;
    avg_rating = (avg * count)
    avg_rating = avg_rating + parseInt(req.body.rating)
    count = count + 1;
    avg_rating = avg_rating / count

    const post = new comment({ property: req.body.property, user: req.userInfo._id, rating: req.body.rating, comment: req.body.comment })
    post.save()
    property.findByIdAndUpdate(property_.id, { total_ratings: count, rating: avg_rating.toFixed(1) }, function (err, docs) {
        if (!err) {
            console.log("Ratings Updated")
            res.json({ message: "Comment Posted", success: true })
        } else {
            console.log(err)
            res.json({ message: "Something went wrong", success: false })
        }
    })
}

exports.showComments = async (req, res) => {
    const comments = await comment.find({ property: req.params.propertyId }).populate('user')
    console.log('first')
    res.json(comments)
}

exports.myReviews = async (req, res) => {
    const reviews_ = await comment.find({ user: req.userInfo._id }).populate('property')
    res.json(reviews_)
}

exports.likeComment = async (req, res) => {
    const comnt = await comment.findById(req.body.comment)
    const likes = comnt.likes
    const likedBy = comnt.likedBy

    const likedUser = likedBy.indexOf(req.userInfo._id)

    if (req.body.liked) {
        likedBy.push(req.userInfo._id)
        comment.findByIdAndUpdate(comnt._id, { likes: likes + 1, likedBy: likedBy }, function (err, docs) {
            if (!err) {
                console.log("Updated")
            }
            res.json({ likes: likes + 1 })
        })
    } else {
        if (likedUser !== -1) {
            likedBy.splice(likedUser, 1)
        }
        comment.findByIdAndUpdate(comnt._id, { likes: likes - 1, likedBy: likedBy }, function (err, docs) {
            if (!err) {
                console.log("Updated")
            }
            res.json({ likes: likes - 1 })
        })
    }
}

exports.contact = async (req, res) => {
    try {
        var contact = await new contactModal(req.body);
        res.json("success")
    } catch (error) {
        res.json(error)
    }
}
exports.contactget = async (req, res) => {
    try {
        var contact = await contactModal.find();
        res.json(contact)
    } catch (error) {
        res.json(error)
    }
}