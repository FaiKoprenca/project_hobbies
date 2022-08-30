const connectToDatabase = require('../database/db');
const User = require('../models/User');
const Post = require('../models/Post');

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
    const userId = event.pathParameters.id;

    const { username, text, tags/*, date, startTime, endTime,*/, limit } = JSON.parse(
        event.body
    );

    const post = new Post({
        userId,
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

        const posts = Post.create(post).then(function (dbposts) {
            return User.findOneAndUpdate({ userId }, {
                $push: { posts: dbposts.userId }
            }, { new: true });
        })
        callback(null, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, OPTIONS, POST",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify(posts),
        });
    } catch (error) {
        returnError(error);
    }
};