const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const BlackList = require("../models/BlackList.model");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const isCaptainExists = await captainModel.findOne({ email });
  if (isCaptainExists) {
    return res.status(400).json({ error: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);
  const captain = await captainService.createCaptain({
    first_name: fullname.first_name,
    last_name: fullname.last_name,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  // include hashed password to compare
  const captain = await captainModel.findOne({ email }).select('+password');
  if (!captain) {
    return res.status(400).json({ error: "Invalid Email or Password" });
  }

  const isPasswordValid = await captain.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid Email or Password" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res) => {
  // Send back the authenticated captain profile
  res.status(200).json({
    captain: req.captain,
  });
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  // add token to blacklist collection
  await BlackList.create({ token });
  res.clearCookie("token");

  res.status(200).json({ message: "Logged out successfully" });
};
