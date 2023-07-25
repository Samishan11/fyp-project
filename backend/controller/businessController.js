const Booking = require("../models/bookingModel");
const e = require("cors");
const Propertymodel = require("../models/propertyModel");
const rentings = require("../models/rentModel");
const userModel = require("../models/userModel");
exports.getProperty = async (req, res) => {
  let data;
  try {
    if (req.query.title) {
      data = await Propertymodel.find({ title: req.query.title });
    } else if (req.query.property_type) {
      data = await Propertymodel.find({
        property_type: req.query.property_type,
      });
    } else if (req.query.address) {
      data = await Propertymodel.find({ address: req.query.address });
    } else {
      data = await Propertymodel.find().sort({ created_date: -1 });
    }
    res.json({ data: data });
  } catch (error) {}
};

exports.listProperty = async (req, res) => {
  var data = req.body;
  data.owner = req.userInfo._id;
  const addData = new Propertymodel(data);
  addData.save().then(function (result) {
    console.log(result);
    res.json({ result });
  });
};

exports.getSingleProperty = async (req, res) => {
  const result = await Propertymodel.findById(req.params.propertyId).populate(
    "owner"
  );
  res.json({ result });
};

exports.myListings = async (req, res) => {
  const data = req.body;
  const result = await Propertymodel.find({ owner: req.userInfo._id }).populate(
    "owner"
  );
  res.json({ result });
};
exports.updateListing = async (req, res) => {
  const data = req.body;
  const result = Propertymodel.findByIdAndUpdate(
    req.params.propertyId,
    data,
    function (err, docs) {
      if (!err) {
        res.json({ message: "updated", success: true });
      }
    }
  );
};

exports.deleteListing = async (req, res) => {
  Propertymodel.findOneAndDelete(
    { _id: req.params.propertyId },
    async function (err, docs) {
      if (!err) {
        const result = await Propertymodel.find({
          owner: req.userInfo._id,
          is_deleted: false,
        }).populate("owner");
        await Booking.findOneAndDelete({ property: req.params.propertyId });
        res.json({ message: "Listing removed", success: true, result: result });
      }
    }
  );
};

exports.addRoom = async (req, res) => {
  const data = req.body;
  const property = await Propertymodel.findById(req.params.propertyId);
  var rooms = property.rooms;
  rooms.push(data);
  const result = Propertymodel.findByIdAndUpdate(
    req.params.propertyId,
    { rooms: rooms },
    function (err, docs) {
      if (!err) {
        res.json({ result: docs });
      }
    }
  );
};

exports.addPropertyImage = async (req, res) => {
  console.log(req.params.propertyId);
  const property = await Propertymodel.findById(req.params.propertyId);
  var images = property?.images;
  if (!req.file) {
    res.json({ message: "Please insert a valid image", success: false });
  } else {
    images?.push(req?.file?.path);
    const result = Propertymodel.findByIdAndUpdate(
      property?._id,
      { images: images },
      function (err, docs) {
        if (!err) {
          res.json({ result: docs, message: "Image Uploaded", success: true });
        } else {
          console.log(err);
        }
      }
    );
  }
};

exports.searchProperty = async (req, res) => {
  // const keys = new RegExp(req.params.keys, "i");
  const keys = new RegExp(req.params.keys, "i");
  console.log(keys);

  try {
    var search = await Propertymodel.find({
      $or: [
        { title: { $regex: keys } },
        { category: { $in: [keys] } },
        { "rooms.room_type": { $in: [keys] } },
        // { "rooms.floor": { $in: [keys] } },
        // { "rooms.room_count": { $in: [keys] } },
        // { "rooms.room_size": { $in: [keys] } },
        // { "rooms.single_bed": { $in: [keys] } },
        // { "rooms.double_bed": { $in: [keys] } },
        // { "rooms.kings_bed": { $in: [keys] } },
        { "address.city": { $in: [keys] } },
        { "address.address": { $in: [keys] } },
        { "address.postal": { $in: [keys] } },
      ],
    }).populate("owner");

    if (search.length === 0) {
      res.json("Not found");
    } else {
      res.json({ data: search, success: true });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.recommandationProperties = async (req, res) => {
  // const address  = req.body.address; // this will be from local storage
  let address = new RegExp("Kathmandu", "i");
  const user = req.userInfo._id;
  userModel.findById(user).then((docs) => {
    var addressString = docs.address;
    if (addressString) {
      var addressN = addressString.split(", ");
      address = addressN[addressN.length - 1];
      Propertymodel.find({
        $or: [
          { "address.address": { $regex: address } },
          { "address.city": { $regex: address } },
        ],
      })
        .limit(10)
        .then((docs) => {
          res.json({ data: docs, success: true });
        });
    }
  });
};

exports.filterProperty = async (req, res) => {
  const query = req.params.query;

  const category = req.body.category;
  const price = req.body.price;
  const rating = req.body.rating;
  var properties = await Propertymodel.find({
    $or: [
      { "address.address": { $regex: query, $options: "i" } },
      { "address.city": { $regex: query, $options: "i" } },
    ],
  })
    .populate("owner")
    .limit(20);

  console.log(properties.length);

  // filtering category
  if (category) {
    console.log(`Filtering Category By ${category}...`);
    properties = properties.filter((val, ind) => {
      return val.category === category;
    });
  }

  // filtering price
  if (price) {
    console.log("Filtering Price...");
    properties = properties.filter((val, ind) => {
      return val.price >= price.minPrice && val.price <= price.maxPrice;
    });
  }

  if (rating) {
    console.log("Filtering Rating...");
    console.log(rating);
    properties = properties.filter((val, ind) => {
      return val.rating <= rating + 1 && val.rating >= rating;
    });
  }

  if (properties.length > 0) {
    res.json({ data: properties, success: true });
  } else {
    res.json({ data: "No results found", success: false });
  }
};

exports.getPropertyLocation = async (req, res) => {
  const property = await Propertymodel.find({
    "address.city": req.params.location,
  }).populate("owner");
  res.json(property);
};
exports.getPropertyCategory = async (req, res) => {
  console.log(req.params.category);
  const properties = await Propertymodel.find().populate("owner");
  res.json({ data: properties, success: true });
};
exports.getPropertyCategoryWise = async (req, res) => {
  console.log(req.params.category);
  const properties = await Propertymodel.find({
    category: req.params.category,
  }).populate("owner");
  res.json({ data: properties, success: true });
};

// // comment on property
// exports.commentOnProperty = async (req, res) => {
//     const data = req.body
//     Propertymodel.findByIdAndUpdate(req.params.propertyId, {
//         $push: {
//             comments: data
//         }
//     }, function (err, docs) {
//         if (!err) {
//             res.json({ message: "commented", success: true })
//         } else {
//             res.json(err)
//         }
//     })
// }

// // delete comment on property
// exports.deleteComment = async (req, res) => {
//     Propertymodel.findByIdAndUpdate(req.params.propertyId, {
//         $pull: {
//             comments: {
//                 user: req.body.userId,
//                 _id: req.body.commentId
//             }
//         }
//     }, function (err, docs) {
//         if (!err) {
//             console.log(req.body);
//             res.json({ message: "comment deleted", success: true })
//         } else {
//             res.json(err)
//         }
//     })
// }

// // like property
// exports.likeComment = async (req, res) => {
//     const data = req.body
//     Propertymodel.findByIdAndUpdate(req.params.propertyId,
//         {
//             $push: {
//                 like_comment: data
//             }
//         }
//         , function (err, docs) {
//             if (!err) {
//                 res.json({ message: "liked", success: true })
//             } else {
//                 res.json(err)
//             }
//         })
// }

// // unlike property
// exports.unlikeComment = async (req, res) => {
//     Propertymodel.findByIdAndUpdate(req.params.propertyId,
//         {
//             $pull: {
//                 like_comment: {
//                     _id: req.body.likeId,
//                     user: req.body.userId
//                 }
//             }
//         }
//         , function (err, docs) {
//             if (!err) {
//                 res.json({ message: "unliked", success: true })
//             } else {
//                 res.json(err)
//             }
//         })
// }

// // get likes
// exports.likesOnComment = async (req, res) => {
//     Propertymodel.findOne({
//         _id:req.params.propertyId
//     }
//         , function (err, docs) {
//             if (!err) {
//                 const like = docs.like_comment.filter(like=> like.comment.toString() === req.params.commentId)
//                 if(like){
//                     res.json({ data: like, success: true })
//                 }
//             } else {
//                 res.json(err)
//             }
//         })
// }

// commnet on property
exports.commentOnProperty = async (req, res) => {
  try {
    const comment_ = await new Comment(req.body);
    await comment_.save();
    res.json({ data: comment_ });
  } catch (error) {
    res.json(error);
  }
};
// commnet on property
// exports.replyOnComment = async (req, res) => {
//     try {
//         const replycomment_ = await Commentmodel.findById(req.params.commentId,{
//             $push:{
//                 reply_comment:req.body
//             }
//         });
//         await replycomment_.save()
//         res.json({ data: replycomment_ })
//     } catch (error) {
//         res.json(error)
//     }
// }
exports.markRented = async (req, res) => {
  const customerId = req.params.customerId;
  const propertyId = req.params.propertyId;

  const property = await Propertymodel.findById(propertyId);

  if (property.available) {
    const rent = new rentings({
      property: propertyId,
      owner: req.userInfo._id,
      customer: customerId,
    });
    rent.save();

    Propertymodel.findByIdAndUpdate(propertyId, { available: false }).then(
      function (err, docs) {
        if (!err) {
          console.log(docs);
        }
      }
    );
    res.json({ message: "Action Completed", success: true });
  }
};

exports.rentingsVendor = async (req, res) => {
  const rentings_ = await rentings
    .find({ owner: req.userInfo._id })
    .populate("owner")
    .populate("property")
    .populate("customer");
  res.json({ rentings: rentings_, success: true });
};

exports.rentingsCustomer = async (req, res) => {
  const rentings_ = await rentings
    .find({ customer: req.userInfo._id })
    .populate("customer", "property")
    .populate("customer");
  res.json({ rentings: rentings_, success: true });
};
