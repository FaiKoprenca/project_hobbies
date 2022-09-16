const connectToDatabase = require('../../database/db');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comments');

module.exports.getCommentsByUserId = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findById(id).populate("posts");
      const post = await user.find({posts})
      if (!user) {
        callback(null, (404, `No user found with id: ${id}`));
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
        body: JSON.stringify(user.posts.comment),
      };
    } catch (error) {
      return(error);
    }
};
