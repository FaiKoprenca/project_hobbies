const connectToDatabase = require('../../database/db');
const User = require('../../models/User');
const Post = require('../../models/Post');


module.exports.getPostsByUserId = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findById(id).populate("posts");
      const post = user.posts

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

  
      if (!user) {
        callback(null, (404, `No user found with id: ${id}`));
      }
  
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 200,
        body: JSON.stringify(user.posts),
      };
    } catch (error) {
      return(error);
    }
};