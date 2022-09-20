const connectToDatabase = require("../../database/db");
const Post = require("../../models/Post");

module.exports.getPostsByTag = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    const querystring = event.queryStringParameters;
    let filter = {};
    filter = querystring.tags.split(",");
    let page = {};
    page = querystring.page;
    // console.log(querystring.page);
    let skipValue = (querystring.page - 1) * 10;

    let totalDocuments = await Post.count({ "tags": filter });
    console.log(totalDocuments);
    totalPages = Math.ceil(totalDocuments / 10);
    console.log(totalPages);

    const post = await Post.find({ "tags": filter })
      .skip(skipValue)
      .limit(10)
      .sort({ date: -1 });

    if (!post) {
      callback(null, (404, "No posts Found."));
    }

    callback(null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(post),
    });
  } catch (error) {
    return error;
  }
};
