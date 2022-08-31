const connectToDatabase = require('../database/db');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comments');
const Like = require('../models/Like');

module.exports.postPostAtUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;

    const { username, text, tags/*, date, startTime, endTime,*/, limit } = JSON.parse(
        event.body
    );

    const post = new Post({
        //userId,
        username,
        text,
        tags,
        /*date,
        startTime,
        endTime,*/
        limit        
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
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify(createdPost),
        });
    } catch (error) {
        returnError(error);
    }
};