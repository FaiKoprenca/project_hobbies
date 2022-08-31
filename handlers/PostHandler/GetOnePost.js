const connectToDatabase = require('../../database/db');
const User = require('../../models/User');
const Post = require('../../models/Post');


module.exports.getOnePost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const post = await Post.findById(id);
  
      if (!post) {
        callback(null, createErrorResponse(404, `No post found with id: ${id}`));
      }
  
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 200,
        body: JSON.stringify(post),
      };
    } catch (error) {
      returnError(error);
    }
};
