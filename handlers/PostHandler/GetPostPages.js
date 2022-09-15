const connectToDatabase = require('../../database/db');
const Post = require('../../models/Post');

module.exports.getPostPages = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await connectToDatabase();
        
        let totalDocuments = await Post.count();
        console.log(totalDocuments);
        totalPages = Math.ceil(totalDocuments / 10);
        console.log(totalPages);

        callback(null, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, OPTIONS, POST",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify(totalPages),
        });
    } catch (error) {
        return(error);
    }
};