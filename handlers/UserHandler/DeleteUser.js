const connectToDatabase = require('../../database/db');
const User = require('../../models/User');

module.exports.deleteUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findByIdAndRemove(id);
      if (!user) {
        callback(null, createErrorResponse(404, `No user found with id: ${id}, cannot delete`));
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
          message: `Removed user with id: ${user._id}`,
          user,
        }),
      };
    } catch (error) {
      return(error);
}};