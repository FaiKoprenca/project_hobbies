const connectToDatabase = require('../../database/db');
const User = require('../../models/User');


module.exports.getFollowed = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findById(id).populate("followed");
  
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
        body: JSON.stringify(user.followed),
      };
    } catch (error) {
      return(error);
    }
};