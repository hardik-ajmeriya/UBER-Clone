const userModel = require("../models/user.model");

module.exports.createUser = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  if (!first_name || !email || !password) {
    throw new Error("All fields are require");
  }
  const user = userModel.create({
    fullname: {
      first_name,
      last_name,
    },
    email,
    password,
  });
  return user;
};
