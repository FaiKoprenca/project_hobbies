const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    //TODO Cognito ID
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
    //maybe another locationTag and sportsTag model for queries
    tags: [
      {
        /*type: Schema.Types.ObjectId,
        ref: "locationTag"
        type: Schema.Types.ObjectId,
        ref: "sportsTag"*/
        //add to database predefined locations, sports
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
    likes: {
      type: Schema.Types.ObjectId,
      ref: "Like"
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
