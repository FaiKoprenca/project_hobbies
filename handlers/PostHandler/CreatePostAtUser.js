const connectToDatabase = require("../../database/db");
const User = require("../../models/User");
const Post = require("../../models/Post");
var ObjectId = require("mongodb").ObjectId;
//const validateCreatePost = require("../../Validations/validateCreatePost");

module.exports.postPostAtUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  //TODO
  // const { errors, isValid } = validateCreatePost(event.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const { username, text,tags, date, startTime, endTime, limit } = JSON.parse(
    event.body
  );

  const post = new Post({
    //userId,
    username,
    text,
    tags,
    date,
    startTime,
    endTime,
    limit,
  });

  try {
    await connectToDatabase();
    console.log(post);
    const createPost = await Post.create(post);
    const createdPost = await User.findOneAndUpdate(
      { _id: id },
      { $push: { posts: createPost._id } },
      { new: true }
    );
    callback(null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Allow": "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(createdPost),
    });
  } catch (error) {
    return(error);
  }
};

/*module.exports.postPostAtUserCognitoTry = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;


    const reqBody = JSON.parse(event.body)
    const postId = reqBody._id;

    console.log(postId);

    //TODO the logged in user id
    const userId = event.pathParameters.id;

    const post = new Post({
        username,
        text,
        tags,
        limit
    });

    try {
        await connectToDatabase();
        //console.log(post);
        const createPost = await Post.create(post);
        const createdPost = await User.findOneAndUpdate(
            { _id: id },
            { $push: { posts: createPost._id } },
            { new: true }
        );
        callback(null, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, OPTIONS, POST",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify(createdPost),
        });
    } catch (error) {
        returnError(error);
    }
};*/
