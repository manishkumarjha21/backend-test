const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email id",
      });
    }
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      mobile,
    });
    return res.status(200).json({
      success: true,
      message: "Sign up successfully! Please login now.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "User can't created, please try again...",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not exist with this email id",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        samesite: "None",
        secure: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        message: "User Logged in Successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failure",
      Error: err,
    });
  }
};

exports.getuserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: "user Details",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "can't find user details",
    });
  }
};
