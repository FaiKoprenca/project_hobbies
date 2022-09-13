const connectToDatabase = require("../../database/db");
const User = require("../../models/User");

module.exports.follow = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    const queries = [];


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
