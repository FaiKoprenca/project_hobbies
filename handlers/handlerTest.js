const connectToDatabase = require('../database/db');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comments');

module.exports.getUsers = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const users = await User.find();
        if (!users) {
            callback(null, createErrorResponse(404, 'No Users Found.'));
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
            body: JSON.stringify(users),
        });
    } catch (error) {
        returnError(error);
    }
};


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


module.exports.postCommentAtPost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;

    const { text } = JSON.parse(
        event.body
    );

    const comments = new Comment({
        text       
    });

    try {
        await connectToDatabase();
        console.log(comments);

        const createComment = await Comment.create(comments);
        const createdComment = await Post.findOneAndUpdate(
            { _id: id },
            { $push: { comment: createComment._id } },
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
            body: JSON.stringify(createdComment),
        });
    } catch (error) {
        returnError(error);
    }
};