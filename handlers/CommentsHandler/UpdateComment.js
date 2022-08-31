const connectToDatabase = require('../../database/db');
const Comment = require('../../models/Comments');

module.exports.updateComment = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
  
    const { text } = data;
  
    try {
      await connectToDatabase();
  
      const comment = await Comment.findById(event.pathParameters.id);
  
      /*if (comment) {
         comment.text = text || comment.text;
      }*/
  
      const newComment = await comment.save();
  
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 200,
        body: JSON.stringify(newComment),
      };
    } catch (error) {
      return(error);
    }
};