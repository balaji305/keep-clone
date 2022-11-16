const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Required Field"],
    },
    password: {
      type: String,
      required: [true, "Required Field"],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
module.exports = mongoose.model("User", UserSchema);
