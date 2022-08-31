const connectToDatabase = require('../database/db');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comments');
const Like = require('../models/Like');

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