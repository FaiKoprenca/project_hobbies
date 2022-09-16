const connectToDatabase = require("../../database/db");
const User = require("../../models/User");
const Post = require("../../models/Post");

module.exports.joinPost = async (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;

    const userId = event.pathParameters.userId;
    const postId = event.pathParameters.postId;

    try {
        await connectToDatabase();

        const user = await User.findById(userId);

        const joinAtPost = await Post.findOneAndUpdate(
            { _id: postId },
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