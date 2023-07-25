const express = require('express');
const {getProperty, getPropertyCategoryWise , listProperty, getSingleProperty, myListings, updateListing, addRoom,rentingsVendor, rentingsCustomer, addPropertyImage, searchProperty, filterProperty, commentOnProperty, markRented, recommandationProperties, getPropertyCategory, getPropertyLocation, deleteListing } = require('../controller/businessController');
const { verifyUser } = require('../middleware/auth');

const upload = require('../uploads/upload');
const router = express.Router();
router.route('/property').get(getProperty);
router.route("/list-property").post(verifyUser, listProperty);
router.route("/get-property-listing/:propertyId").get(getSingleProperty);
router.route("/my-listings").get(verifyUser, myListings);
router.route("/update-listing/:propertyId").put(updateListing);
router.route("/add-room/:propertyId").post(addRoom);
router.route("/listings/add-image/:propertyId").put( upload.single('image'), addPropertyImage);
router.route('/search/:keys').get(searchProperty);
router.route('/filter/:query').post(filterProperty);
router.route('/get-property-category').get(getPropertyCategory);
router.route('/get-property-category/:category').get(getPropertyCategoryWise);
router.route('/get-property-category/:location').get(getPropertyLocation);
router.route('/delete-listing/:propertyId').put(verifyUser, deleteListing)
router.route("/comment-property").post(commentOnProperty)
router.route('/set-rented/:propertyId/:customerId').post(verifyUser, markRented);
router.route('/rentings-vendor').get(verifyUser, rentingsVendor);
router.route('/rentings-customer').get(verifyUser, rentingsCustomer);
router.route('/recommendations-properties').get(verifyUser, recommandationProperties);


module.exports = router;