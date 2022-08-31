const connectToDatabase = require('../database/db');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comments');
const Like = require('../models/Like');

module.exports.updateComment = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
  
    const { text } = data;
  
    try {
      await connectToDatabase();
  
      const comment = await Comment.findById(event.pathParameters.id);
  
      if (comment) {
         comment.text = text || comment.text;
      }
  
      const newComment = await comment.save();
  
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 204,
        body: JSON.stringify(newComment),
      };
    } catch (error) {
      returnError(error);
    }
};