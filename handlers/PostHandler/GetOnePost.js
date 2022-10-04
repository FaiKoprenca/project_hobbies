const connectToDatabase = require('../../database/db');
const User = require('../../models/User');
const Post = require('../../models/Post');


module.exports.getOnePost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const post = await Post.findById(id);
      // //console.log(post.startTime);
      const dateNow = Math.floor(Date.now()/1000);
      console.log(dateNow);

      const startTimeU = new Date(post.startTime)
      const startTimeUnix = Math.floor(startTimeU.getTime() / 1000);
      console.log(startTimeUnix + "!!!!!!!!!!!!!!!!!!!!!!");

      if(startTimeUnix < dateNow)
      {
        console.log("completed");
        post.status = true;
      }
      else{
        post.status = false;
      }

      console.log(post.status);
  
      if (!post) {
        callback(null, (404, `No post found with id: ${id}`));
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
        body: JSON.stringify(post),
      };
    } catch (error) {
      return(error);
    }
};
