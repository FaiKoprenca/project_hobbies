const connectToDatabase = require("../../database/db");
const Post = require("../../models/Post");

module.exports.checkIfLikes = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  const postId = event.pathParameters.postId;

  try {
    await connectToDatabase();

    const likeCheck = await Post.findById(postId);
    const boolean = likeCheck.likes.includes(id);

    callback(null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(boolean),
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
