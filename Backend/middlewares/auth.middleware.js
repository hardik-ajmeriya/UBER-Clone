const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const BlackList = require("../models/BlackList.model");

module.exports.authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") && authHeader.authorization?.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token Expires" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const isBlacklisted = await BlackList.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Token is Blacklisted" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
