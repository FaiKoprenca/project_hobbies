const connectToDatabase = require("../../database/db");
const User = require("../../models/User");
const Post = require("../../models/Post");
//const validatePostUpdate = require("../../Validations/validateUpdatePost");

module.exports.updatePost = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  //TODO
  // const { errors, isValid } = validatePostUpdate(event.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  try {
    await connectToDatabase();

    const reqBody = JSON.parse(event.body);

    const updatePosts = await Post.updateOne(
      {
        _id: event.pathParameters.id,
      },
      {
        text: reqBody.text,
        limit: reqBody.limit
      }
    )

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 204,
      body: JSON.stringify(updatePosts),
    };
  } catch (error) {
    return(error);
  }
};
