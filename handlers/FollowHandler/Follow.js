const connectToDatabase = require("../../database/db");
const User = require("../../models/User");

module.exports.follow = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  const followersId = event.pathParameters.followersId;

  try {
    await connectToDatabase();
    const user1 =await User.findOneAndUpdate(
      {_id : followersId},
      {$push: {followers: id}},
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
      body: JSON.stringify(user1),
    });
  } catch (error) {
    return error;
  }
};
