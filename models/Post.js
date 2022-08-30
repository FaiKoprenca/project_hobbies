const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    startTime: {
      type: String,
      //required: true,
    },
    endTime: {
      type: String,
    },
    
    limit: {
      type: Number,
      required: true,
    },
    history: [
      {
        date: { type: Date, default: Date.now() },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],//front end type of event: indor or outdor
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
