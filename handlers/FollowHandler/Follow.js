const connectToDatabase = require("../../database/db");
const User = require("../../models/User");

module.exports.follow = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const followId = event.pathParameters.followId;
  const followedId = event.pathParameters.followedId;
  console.log(followId);
  console.log(followedId);

  try {
    await connectToDatabase();

    const followingUser = await User.findOneAndUpdate(
      {_id:followId},
      {$push: {followers : followingUser._id}},
      {new:true}
    );

    const followedUser = await User.findOneAndUpdate(
      {_id:followedId},
      {$push: {followed : followedUser._id}},
      {new:true}
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
      body: JSON.stringify(""),
    });
  } catch (error) {
    return error;
  }
};
