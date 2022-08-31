const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      /*required: true,*/
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    followed: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comment: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  }],
    /*likes: {
      type: Schema.Types.ObjectId,
      ref: "Like"
    }*/
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
