const connectToDatabase = require('../../database/db');
const Comment = require('../../models/Comments');

module.exports.deleteComment = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const comment = await Comment.findByIdAndRemove(id);
      if (!comment) {
        callback(null, (404, `No comment found with id: ${id}, cannot delete`));
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
        body: JSON.stringify({
          message: `Removed comment with id: ${comment._id}`,
          comment,
        }),
      };
    } catch (error) {
      return(error);
}};