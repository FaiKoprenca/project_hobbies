const connectToDatabase = require("../../database/db");
const LocationTag = require("../../models/LocationTag");

module.exports.addLocations = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { text } = JSON.parse(event.body);

  try {
    await connectToDatabase();
    const location = new LocationTag({
        text
    });

    const newLocation = await LocationTag.create(location);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Allow: "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(newLocation),
    };
  } catch (error) {
    return error;
  }
};
