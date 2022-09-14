const connectToDatabase = require("../../database/db");
const Post = require("../../models/Post");
const User = require("../../models/User");

module.exports.search = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    //const querystring = event.queryStringParameters;
    const querystring = event.queryStringParameters;
    let filter = {};
    filter = querystring.searchQuery;

    const post = await Post.find({
      $or: [{ username: { $regex: filter } }, { text: { $regex: filter } }],
    });

    const user = await User.find({
      $or: [
        { username: { $regex: filter, $options: "i" } },

      ],
    });
    if (!user) {
      callback(null, (404, "No users Found."));
    }

    if (!post) {
      callback(null, (404, "No posts Found."));
    }

    callback(null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(user),
    });
  } catch (error) {
    return error;
  }
};
