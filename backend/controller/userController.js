const user = require("../models/userModel");
const property = require("../models/propertyModel");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mail = require('../utils/mail')
const nodeMailer = require("nodemailer")
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args)); // const UserModel = require("../models/userModel");

exports.loginUser = async (req, res) => {
  const data = req.body;
  user.findOne({ username: data.username }).then(function (userData) {
    // console.log(userData);
    if (userData === null) {
      return res.json({ message: "User does not exists!", success: false });
    }

    //checking password
    const password = data.password;
    bcryptjs.compare(password, userData.password, function (e, result) {
      //if true correct password else incorrect
      if (result === false) {
        return res.json({ message: "Invalid Password!", success: false });
      }
      //ticket generate
      const token = jsonwebtoken.sign(
        {
          userId: userData._id,
          username: userData.username,
          user: userData,
          image: userData.image,
          email: userData.email,
        },
        "anysecrectkey"
      );
      // res.json({ 'token': token, verified: user.verified })
      res.json({
        token: token,
        verified: userData.verified,
        admin: userData.admin,
        message: "Successfully Logged In!",
        success: true,
      });
    });
  });
};
exports.registerUser = async (req, res) => {
  const data = req.body;
  const password = data.password;
  let emailExist = await user.findOne({ email: data.email });
  let usernameExist = await user.findOne({ username: data.username });
  if (emailExist) {
    return res.json({
      message: "Email already exists",
      success: false,
      field: "email",
    });
  }
  if (usernameExist) {
    return res.json({
      message: "Username already taken",
      success: false,
      field: "username",
    });
  }
  bcryptjs.hash(password, 10, function (e, hashed_pw) {
    const sData = new user({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: hashed_pw,
      email: data.email,
      phone: data.phone
    });
    sData.save(function (err) {
      // console.log(err)
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Registered Successfully", success: true });
      }
    });
  });
};

exports.profileUpdate = async (req, res) => {
  try {
    const profile = await user.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ message: "Profile Updated", success: true, profile });
  } catch (error) {
    res.json({ error, success: false, message: "Invalid Entry" });
  }
};

exports.profilepicUpdate = async (req, res) => {
  console.log(req.file);
  try {
    const profile = await user.findByIdAndUpdate(
      req.userInfo._id,
      { image: req.file.path },
      { new: true }
    );
    res.json({ message: "Profile pic Updated", success: true, profile });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.myProfile = async (req, res) => {
  try {
    const profile = await user.findOne({ _id: req.params.id });
    if (!profile) {
      res.json({ message: "user not found" });
    } else {
      res.json({ profile });
    }
  } catch (error) { }
};

exports.getAllUser = async (req, res) => {
  const users = await user.find();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const users = await user.find();
  res.json({ user: users[0] });
};

exports.changePassword = async (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const conPassword = req.body.conPassword;
  if (newPassword !== conPassword) {
    return res.json({ message: "Password Did Not Match!", success: false });
  }
  const user_ = await user.findById(req.userInfo._id);
  bcryptjs.compare(oldPassword, user_.password, function (e, result) {
    //if true correct password else incorrect
    if (result === false) {
      return res.json({ message: "Invalid Password!", success: false });
    }
    //let update password
    else {
      bcryptjs.hash(newPassword, 10, function (e, hashed_pw) {
        user
          .findByIdAndUpdate(req.userInfo._id, { password: hashed_pw })
          .then(function (err, docs) {
            return res.json({ message: "Password Updated!", success: true });
          });
      });
    }
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const OTP = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    const transporter = nodeMailer.createTransport({
      // host: "smtp.mailtrap.io",
      host: "smtp.gmail.com",
      port: 597,
      auth: {
        user: process.env.HOST,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: "029593dd4a408c",
      to: req.body.email,
      subject: "OTP Verification",
      text: `Do not share this to others: ${OTP}`,
    };
    if (req.body.email) {
      transporter.sendMail(mailOptions);
      res.json({
        success: true,
        message: `Email Verification Code Send to ${req.body.email} Successfully`,
        OTP: OTP,
      });
    } else {
      console.log("Expired");
    }
  } catch (err) {
    return err;
  }
};

exports.setVerified = async (req, res) => {
  user.findByIdAndUpdate(req.userInfo._id, { verified: true }, function (err, docs) {
    if (!err) {
      res.json({ message: "Verified", success: true })
    }
  })
}

// google sign in
exports.googleLogin = async (req, res) => {
  const email = req.body.email;
  const checkuser = await user.findOne({ email: email }).exec();
  // console.log(email, checkuser);
  if (checkuser == null) {
    const sData = new user({
      username: req.body.email.split("@")[0],
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      googleId: req.body.googleId,
    });
    sData.save(function (err) {
      // console.log(err)
      if (err) {
        res.json({ message: err.message });
      } else {
        // console.log("Hello Goku: " + sData);
        const token = jsonwebtoken.sign(
          {
            userId: sData._id,
            username: sData.username,
            user: sData,
            image: sData.image,
            email: sData.email,
          },
          "anysecrectkey"
        );
        res.json({ message: "Login Success", token: token, success: true });
      }
    });
  } else {
    const token = jsonwebtoken.sign({ userId: checkuser._id, username: checkuser.username, user: checkuser, image: checkuser.image, email: checkuser.email }, "anysecrectkey");
    res.json({ message: "Login Success", token: token, success: true , admin:checkuser.admin });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await user.findOneAndDelete({ _id: req.params.userid });
    await property.deleteMany({ owner: req.params.userid });
    // await comment.deleteMany({ user: req.params.userid });
    res.json({ success: true, message: "user deleted" });
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: "something went wrong!!!" });
  }
};

exports.rateUser = async (req, res) => {

  const usr = await user.findById(req.body.userId)

  var avg = usr.rating;

  var count = usr.total_ratings;
  avg_rating = (avg * count)
  avg_rating = avg_rating + parseInt(req.body.rating)
  count = count + 1;
  avg_rating = avg_rating / count
  user.findByIdAndUpdate(usr._id, { rating: avg_rating, total_ratings: count }, function (err, docs) {
    if (!err) {
      res.json({ message: "Rating updated", success: true })
    }

  })

}

exports.resetPasswordLink = async (req, res) => {
  console.log(process.env.HOST)
  console.log(process.env.PASS)
  const OTP = otpGenerator.generate(10, { upperCase: false, specialChars: false });
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.HOST,
        pass: process.env.PASS
    }
});
  const user_ = await user.findOne({ email: req.body.email })
  if (user_) {
    const passwordToken = await user_.getResetPasswordToken(user_._id)
    const resetPasswordUrl = `http://localhost:3000/reset-password/${passwordToken}`
    const mailOptions = {
      from: "029593dd4a408c",
      to: user_.email,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) has requested the reset your account password password. \n\n ${resetPasswordUrl}\n\n 
                If you have not requested it then ignore it.`
    };
    transporter.sendMail(mailOptions);
    res.json({ message: "Email sent", success: true })
  } else {
    res.json({ message: "Email does not exist", success: false })
  }
}
exports.resetPassword = async (req, res) => {
  const newPassword = req.body.password
  console.log(req.body.userId)
  bcryptjs.hash(newPassword, 10, function (e, hashed_pw) {
    user.findByIdAndUpdate(req.body.userId, { password: hashed_pw }).then(function (err, docs) {
      return res.json({ message: "Password Updated!", success: true });
    })
  })
}

// facebook sign in
exports.facebookLogin = async (req, res) => {
  const data = req.body;
  const accessToken = "";
  const refreshToken = "";
  const { id, name, avatar, email } = req.body;
  try {
    const checkId = await user.findOne({ username: data.name });
    // console.log("hh " + data.name);
    if (!checkId) {
      const newUser = new user({
        facebookId: id,
        username: req.body.name,
        firstName: req.body.name.split(" ")[0],
        lastName: req.body.name.split(" ")[1],
        email: req.body.email,
        image: avatar
      }).save().then((docs) => {
        console.log("hhhhh " + docs);
        const token = jsonwebtoken.sign({ userId: docs._id, username: docs.username, user: docs, image: docs.image, email: docs.email }, "anysecretkey");
        res.json({ "message": "Login Success with facebook", 'token': token, status: true });
      })
    } else {
      console.log(checkId)
      const token = jsonwebtoken.sign({ userId: checkId._id, username: checkId.username, image: checkId.image, email: checkId.email }, "anysecretkey");
      res.json({ token: token });
    }
  } catch (error) {
    res.json(error)
  }
};

exports.rateUser = async (req, res) => {
  const usr = await user.findById(req.body.userId)
  var avg = usr.rating;
  var count = usr.total_ratings;
  avg_rating = (avg * count)
  avg_rating = avg_rating + parseInt(req.body.rating)
  count = count + 1;
  avg_rating = avg_rating / count

  user.findByIdAndUpdate(usr._id, { rating: avg_rating, total_ratings: count }, function (err, docs) {
    if (!err) {
      res.json({ message: "Rating updated", success: true })
    }
  })
}

exports.reportUser = async (req, res) => {
  const reason = req.body.report
  const user_ = await user.findById(req.body.userId)
  var reports = user_.reports
  reports.push({ user: req.body.userId, report: reason })
  user.findByIdAndUpdate(req.body.userId, { reports: reports }, function (err, docs) {
    if (!err) {
      console.log("Updated")
      res.json({ message: "Report Submitted", success: true })
    }
  })

}
