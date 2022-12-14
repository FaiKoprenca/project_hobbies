const connectToDatabase = require("../../database/db");
const SportsTag = require('../../models/SportsTag');

module.exports.addSports = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { text } = JSON.parse(event.body);

  try {
    await connectToDatabase();
    const sports = new SportsTag({
        text
    });

    const newSport = await SportsTag.create(sports);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Allow: "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(newSport),
    };
  } catch (error) {
    return error;
  }
};
