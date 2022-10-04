const connectToDatabase = require('../../database/db');
const Post = require('../../models/Post');

module.exports.getAllPosts = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        const querystring = event.queryStringParameters;
        let filter = {};
        filter = querystring.page;
        console.log(querystring.page)
        let skipValue = (querystring.page - 1) * 10;
        await connectToDatabase();
        let totalDocuments = await Post.count();
        console.log(totalDocuments);
        totalPages = Math.ceil(totalDocuments / 10);
        console.log(totalPages);
        const post = await Post.find().skip(skipValue).limit(10).sort({ date: -1 });

        const dateNow = Math.floor(Date.now() / 1000);

        for (let index = 0; index < post.length; index++) {
            const { startTime } = post[index];
            const startTimeU = new Date(startTime)
            const startTimeUnix = Math.floor(startTimeU.getTime() / 1000);
            if (startTimeUnix < dateNow) {

                post[index].status = "Completed";
            }
            else {
                post[index].status = "OnGoing";
            }
        }

        if (!post) {
            callback(null, (404, 'No posts Found.'));
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
            body: JSON.stringify({ post }),
        });
    } catch (error) {
        return (error);
    }
};