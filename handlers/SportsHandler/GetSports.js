const connectToDatabase = require("../../database/db");
const SportsTag = require('../../models/SportsTag');

module.exports.getSports = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
      await connectToDatabase();
      const sports = await SportsTag.find();
      if (!sports) {
        callback(null, createErrorResponse(404, 'No sports Found.'));    //TODO research to change callback
      }
  
      callback(null, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Allow": "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers": "*"
        },
        statusCode: 200,
        body: JSON.stringify(sports),
      });
    } catch (error) {
      return(error);
    }
  };
  