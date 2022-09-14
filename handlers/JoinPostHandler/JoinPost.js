//TODO  serverless hander !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1  GET FUNCTION


const connectToDatabase = require("../../database/db");
const User = require("../../models/User");
const Post = require("../../models/Post");

module.exports.joinPost = async (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;

    const postId = event.pathParameters.id;
    const userId = event.pathParameters.userId;

    try {
        await connectToDatabase();

        // const post = await Post.findById(postId);
        const user = await User.findById(userId);

        const joinAtPost = await Post.findOneAndUpdate(
            { _id: postId },
            //{ $push: { joined: user._id } },
            { $push: { joined: userId } },
            { new: true }
        )

        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, OPTIONS, POST",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify("!!!!!!!!!!!!!!!!!")
        };
    } catch (error) {
        return (error);
    }

}