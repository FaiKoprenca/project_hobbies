const connectToDatabase = require("../../database/db");
const Comment = require("../../models/Comments");
//const validateCommentInput = require("../../Validations/validateComments");

module.exports.updateComment = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();

    const reqBody = JSON.parse(event.body);

    const updateComments = await Comment.updateOne(
      {
        _id: event.pathParameters.id,
      },
      {
        text: reqBody.text,
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
      statusCode: 200,
      body: JSON.stringify(updateComments),
    };
  } catch (error) {
    return(error);
  }
};
