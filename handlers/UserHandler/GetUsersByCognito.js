const connectToDatabase = require('../../database/db');
const User = require('../../models/User');


module.exports.getUserByCognitoId = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.body.id;
    console.log(id , " id here");
  
    try {
      await connectToDatabase();
      const user = await User.findOne(
        {userCognitoId:id}
        )
      //.populate("posts");
  
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
        body: JSON.stringify(user),
      };
    } catch (error) {
        console.log(error);
      return(error);
    }
};