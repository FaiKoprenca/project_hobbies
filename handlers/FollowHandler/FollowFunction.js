const connectToDatabase = require("../../database/db");
const User = require("../../models/User");
//TODO Save CognitoID
module.exports.postFollowerAtUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;

  const follow = JSON.parse(event.body);

  try {
    await connectToDatabase();
    console.log(follow);
    const createFollower = await User.create(follow);
    const createdFollower = await User.findOneAndUpdate(
      { _id: id },
      { $push: { followers: createFollower._id } },
      { new: true }
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
      body: JSON.stringify(createdFollower),
    });
  } catch (error) {
    return(error);
  }
};
