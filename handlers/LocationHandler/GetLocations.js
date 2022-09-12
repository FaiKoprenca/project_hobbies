const connectToDatabase = require("../../database/db");
const LocationTag = require("../../models/LocationTag");

module.exports.getLocations = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
      await connectToDatabase();
      const location = await LocationTag.find();
      if (!location) {
        callback(null, createErrorResponse(404, 'No locations Found.'));    //TODO research to change callback
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
        body: JSON.stringify(location),
      });
    } catch (error) {
      return(error);
    }
  };
  