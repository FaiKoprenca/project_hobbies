const connectToDatabase = require("../../database/db");
const LocationTag = require("../../models/LocationTag");

module.exports.deleteLocation = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const location = await LocationTag.findByIdAndRemove(id);
      if (!location) {
        callback(null, (404, `No location found with id: ${id}, cannot delete`));
      }
      return {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Allow": "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers": "*"
        },
        statusCode: 200,
        body: JSON.stringify({
          message: `Removed location with id: ${location._id}`,
          location,
        }),
      };
    } catch (error) {
      return(error);
    }
  };
  