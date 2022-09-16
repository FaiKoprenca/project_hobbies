const connectToDatabase = require("../../database/db");
const User = require("../../models/User");

module.exports.checkIfFollows = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  const followersId = event.pathParameters.followersId;

  try {
    await connectToDatabase();

    

    const userFollower = await User.findById(followersId);

    const boolean = userFollower.followers.includes(id)
   
    callback(null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(boolean),
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
