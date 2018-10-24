const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId, //если объявить, то тогда надо генерировать самому, иначе база генерирует сама
  login: "string",
  password: "string",
  firstName: "string",
  lastName: "string",
  accessMode: "number",
  houseID: { type: mongoose.Schema.Types.ObjectId, ref: "house" },
  managerID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  meter: { type: mongoose.Schema.Types.ObjectId, ref: "meter" }
});

//const User = mongoose.model("users", userSchema);
//module.exports = User;
module.exports = mongoose.model("users", userSchema);

