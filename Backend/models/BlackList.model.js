const mongoose = require("mongoose");
const BlackListSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 }, // 24 hours TTL
});

module.exports = mongoose.model("BlackList", BlackListSchema);
