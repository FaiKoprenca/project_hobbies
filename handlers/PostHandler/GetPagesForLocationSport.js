const connectToDatabase = require("../../database/db");
const Post = require("../../models/Post");

module.exports.getPagesForLocationSport = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    const querystring = event.queryStringParameters;
    // let page = {};
    // page = querystring.page;
    // //console.log(querystring.page);
    // let skipValue = (querystring.page - 1) * 10;
    let filter = {};
    filter = querystring.tags;
    // //console.log(querystring.tags)
    let totalDocuments = await Post.count({ "tags": filter });
    console.log(totalDocuments);
    totalPages = Math.ceil(totalDocuments / 10);
    console.log(totalPages);

    // let post = await Post.find({ "tags": filter })
    //   .skip(skipValue)
    //   .limit(10)
    //   .sort({ date: -1 });

    callback(null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(totalPages),
    });
  } catch (error) {
    return error;
  }
};
