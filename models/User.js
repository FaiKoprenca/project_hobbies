const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    userCognitoId: {
      type: String,
    },
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

    prfilePicture: {             // !!!!!!!!!!! TODO 
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
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
