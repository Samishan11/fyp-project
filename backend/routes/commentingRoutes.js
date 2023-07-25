const express = require('express');

const { postReview, contact, contactget, showComments, likeComment, myReviews } = require('../controller/commentingController');
const { verifyUser } = require('../middleware/auth');
const router = express.Router()

router.route('/post-review/:propertyId').post(verifyUser, postReview)
router.route('/contact').post(contact)
router.route('/contact-get').get(contactget)
router.route('/show-comments/:propertyId').get(verifyUser, showComments)
router.route('/my-reviews').get(verifyUser, myReviews)
router.route('/like-comment').put(verifyUser, likeComment)

module.exports = router;