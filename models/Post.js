const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    //TODO Cognito ID
    postCognitoId: {
      type: String,
    },
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
        type: Schema.Types.ObjectId,
        ref: "LocationTag",
      },
      {
        type: Schema.Types.ObjectId,
        ref: "SportsTag",
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
    limit: {
      type: Number,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    joined: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    history: [
      {
        date: { type: Date, default: Date.now() },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
