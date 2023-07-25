const Booking = require("../models/bookingModel");
const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const { mail } = require("../utils/mail");
const axios = require("axios");
exports.Booking = async (req, res) => {
  try {
    const isExist = await Booking.findOne({
      user: req.body.user,
      property: req.body.property,
    });
    if (!isExist) {
      const booking_ = await new Booking(req.body);
      await booking_.save();
      res.json(booking_);
    } else {
      res.json({ message: "Propery already booked", booked: true });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.Update_Booking = async (req, res) => {
  try {
    console.log(req.body);
    const isExist = await Booking.findOne({ property: req.params.id });
    console.log(isExist.accept);
    const property = await Property.findOne({ _id: req.params.id });
    property.available = false;

    const user = await User.findOne({ _id: isExist.user });
    isExist.accept = true;
    isExist.appointment = req.body.appointment;
    property.save();
    isExist.save();
    mail().sendMail({
      from: "joker.shan99@gmail.com",
      to: user.email,
      subject: "Real-Estate Meeting Shedule.",
      html: `<p style="text-align:center; font-size:16px;"> The property you had been offered has been accepted and meeting has been shedule on ${new Date(
        req.body.appointment
      ).toDateString()} </p>`,
    });
    res.json({ message: "Verified" });
  } catch (error) {
    res.json(error);
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const isExist = await Booking.findOne({
      user: req.params.user,
      property: req.params.property,
    });
    if (isExist) {
      await Booking.findOneAndDelete({
        user: req.params.user,
        property: req.params.property,
      });
      res.json({ message: "Booking Canceled", deleted: true });
    } else {
      res.json({
        message: "You have not booked the property yet",
        deleted: false,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.mybookings = async (req, res) => {
  if (req.params.type === "customer") {
    const bookings = await Booking.find({ user: req.userInfo._id })
      .populate("property")
      .populate("user");
    console.log("aa", bookings);
    res.json(bookings);
  } else {
    const bookings = await Booking.find({ vendor: req.userInfo._id })
      .populate("property")
      .populate("user");
    console.log("bb", bookings);
    res.json(bookings);
  }
};

exports.mybooking = async (req, res) => {
  const bookings = await Booking.find({ user: req.userInfo._id })
    .populate("property")
    .populate("user");
  res.json(bookings);
};

exports.mybookingdone = async (req, res) => {
  const bookings = await Booking.find({ user: req.userInfo._id })
    .populate("property")
    .populate("user");
  const filter = bookings.filter((data) => {
    if (data.accept) {
      return data;
    }
  });
  console.log(bookings);
  console.log(filter);
  res.json(filter);
};

// get all trasnsication history
exports.TransicationHistory = async (req, res) => {
  try {
    const response = await axios.get(
      "https://khalti.com/api/v2/merchant-transaction/",
      {
        headers: {
          Authorization: "Key test_secret_key_0d850f6c660b4390a445b1e46c7d2da6",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

// get my trasnsication history
exports.TransicationHistory = async (req, res) => {
  try {
    const response = await axios.get(
      "https://khalti.com/api/v2/merchant-transaction/",
      {
        headers: {
          Authorization: "Key test_secret_key_0d850f6c660b4390a445b1e46c7d2da6",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
