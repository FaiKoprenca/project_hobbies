const connectToDatabase = require('../../database/db');
const User = require('../../models/User');

//TODO Save CognitoID
module.exports.getAllUserFollowers = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findById(id).populate("followers");
  
      if (!user) {
        callback(null, createErrorResponse(404, `No followers found with id: ${id}`));
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
        body: JSON.stringify(user.followers),
      };
    } catch (error) {
      return(error);
    }
};