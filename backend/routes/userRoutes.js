const express = require('express');



const { loginUser, registerUser, profileUpdate, myProfile , profilepicUpdate, getAllUser, changePassword, sendEmail, resetPasswordLink, resetPassword, googleLogin, facebookLogin, rateUser, deleteAccoun, deleteAccount, reportUser, setVerified, getUser } = require('../controller/userController');

const { verifyUser } = require('../middleware/auth');
const router = express.Router();
const uploadProfile = require('../uploads/uploadProfile');



router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/profileUpdate/:id').put(profileUpdate);
router.route('/profile/:id').post(myProfile);
router.route('/users').get(getAllUser);
router.route('/user').get(getUser);
router.route('/update-profile').put(verifyUser, uploadProfile.single("image"), profilepicUpdate)
router.route('/change-password').put(verifyUser, changePassword)
router.route('/send-email').post(sendEmail);
router.route('/verify-email').put(verifyUser, setVerified);
router.route('/rate-user').put(rateUser)
router.route('/reset-password-link').post(resetPasswordLink);
router.route('/reset-password').put(resetPassword);
router.route('/rate-user').put(rateUser)
router.route('/facebook-signin').post(facebookLogin);
router.route('/report-user').post(verifyUser, reportUser);

// google login route
router.route('/google-signin').post(googleLogin);
router.route('/delete-account/:userid').delete(deleteAccount);

module.exports = router;