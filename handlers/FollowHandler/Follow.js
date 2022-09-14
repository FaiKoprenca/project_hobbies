const connectToDatabase = require("../../database/db");
const User = require("../../models/User");

module.exports.follow = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  const postId = event.pathParameters.postId;
  //const userId = event.queryStringParameters;
  // console.log(postId);
  // console.log(userId);

  try {
    await connectToDatabase();
    const user1 =await User.findOneAndUpdate(
      {_id : postId},
      {$push: {followers: id}},
      {new : true},
    );
    
    
    
    
    //const u2 =await User.findById(postId);


    callback(null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(user1),
    });
  } catch (error) {
    return error;
  }
};
