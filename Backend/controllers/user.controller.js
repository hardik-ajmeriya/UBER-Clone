const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const BlackList = require("../models/BlackList.model");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    first_name: fullname.first_name,
    last_name: fullname.last_name,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.cookie("token", token, { httpOnly: true }); // secure: true in production
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid Email and Password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Email and Password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token, { httpOnly: true }); // store in cookie too
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (token) {
    await BlackList.create({ token });
  }

  res.status(200).json({ message: "Logged out successfully" });
};
