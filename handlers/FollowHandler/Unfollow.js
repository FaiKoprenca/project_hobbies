const connectToDatabase = require("../../database/db");
const User = require("../../models/User");

module.exports.unfollow = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  const followersId = event.pathParameters.followersId;
  //const userId = event.queryStringParameters;
  // console.log(postId);
  // console.log(userId);

  try {
    await connectToDatabase();
    const user1 =await User.findOneAndUpdate(
      {_id : followersId},
      {$pull: {followers: id}},
      {new : true},
    );
    
    callback(null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(user1.followers),
    });
  } catch (error) {
    return error;
  }
};
