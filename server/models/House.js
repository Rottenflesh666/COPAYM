const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: String,
  managerID: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
});

module.exports = mongoose.model("house", houseSchema);
