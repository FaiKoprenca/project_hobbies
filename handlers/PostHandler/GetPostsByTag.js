const connectToDatabase = require("../../database/db");
const Post = require("../../models/Post");

module.exports.getPostsByTag = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();;
    const querystring = event.queryStringParameters;
    let filter = {};
    filter = querystring.tags.split(',');

    const post = await Post.find({"tags":filter});

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
      body: JSON.stringify(post),
    });
  } catch (error) {
    return error;
  }
};
