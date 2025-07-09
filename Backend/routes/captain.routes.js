const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.first_name")
      .isLength({ min: 3 })
      .withMessage("First Name must be at least 3 Characters Long!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 Characters Long!"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 Characters Long!"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 Characters Long!"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("Capacity must be a number"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid Vehicle Type"),
  ],
  captainController.registerCaptain
);

module.exports = router;
