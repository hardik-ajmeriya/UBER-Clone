const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  first_name,
  last_name,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const captain = new captainModel({
    fullname: {
      first_name,
      last_name,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  // Save the new captain to the database to enforce unique constraints
  await captain.save();
  return captain;
};
