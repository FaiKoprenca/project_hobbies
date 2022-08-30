const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    /*userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },*/
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
      default: Date.now(),
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
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    history: [
      {
        date: { type: Date, default: Date.now() },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],//front end type of event: indoor or outdoor
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
