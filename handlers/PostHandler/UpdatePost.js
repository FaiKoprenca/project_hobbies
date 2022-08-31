const connectToDatabase = require('../../database/db');
const User = require('../../models/User');
const Post = require('../../models/Post');

module.exports.updatePost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
  
    const { username, text, tags, limit } = data;
  
    try {
      await connectToDatabase();
  
      const post = await Post.findById(event.pathParameters.id);
  
      if (post) {
        post.username = username || post.username;
        post.text = text || post.text;
        post.tags = tags || post.tags;
        post.limit = limit || post.limit;
      }
  
      const newPost = await post.save();
  
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 204,
        body: JSON.stringify(newPost),
      };
    } catch (error) {
      returnError(error);
    }
};
