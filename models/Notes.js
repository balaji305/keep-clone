const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Required Field"],
    },
    title: {
      type: String,
      required: [true, "Required Field"],
    },
    body: {
      type: String,
      required: [true, "Required Field"],
    },
    id: {
      type: Number,
      unique: "true",
      required: [true, "Required Field"],
    },
    isArchived: {
      type: Boolean,
      required: [true, "Required Field"],
    },
    isPinned: {
      type: Boolean,
      required: [true, "Required Field"],
    },
    isDeleted: {
      type: Boolean,
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
module.exports = mongoose.model("Note", NoteSchema);
