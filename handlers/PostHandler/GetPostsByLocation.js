const connectToDatabase = require('../../database/db');
const Post = require('../../models/Post');

module.exports.getPostsByLocation = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const querystring = event.queryStringParameters;
        const post = await Post.find({tags:querystring});
        if (!post) {
            callback(null, createErrorResponse(404, 'No posts Found.'));
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
            body: JSON.stringify(post),
        });
    } catch (error) {
        return(error);
    }
};