const connectToDatabase = require('../database/db');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comments');
const Like = require('../models/Like');

module.exports.getUsers = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const users = await User.find();
        if (!users) {
            callback(null, createErrorResponse(404, 'No Users Found.'));    //TODO research to change callback
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


module.exports.getUserById = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findById(id).populate("posts");
  
      if (!user) {
        callback(null, createErrorResponse(404, `No user found with id: ${id}`));
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
        body: JSON.stringify(user),
      };
    } catch (error) {
      returnError(error);
    }
};

module.exports.postUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    const { username, location, bio } = JSON.parse(event.body);
  
    const user = new User({
      username,
      location,
      bio
    });
  
    try {
      await connectToDatabase();
      const newUser = await User.create(user);
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 200,
        body: JSON.stringify(newUser),
      };
    } catch (error) {
      return(error);
    }
  };


module.exports.updateUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
  
    const { username, location, bio } = data;
  
    try {
      await connectToDatabase();
  
      const user = await User.findById(event.pathParameters.id);
  
      if (user) {
        user.username = username || user.username;
        user.location = location || user.location;
        user.bio = bio || user.bio;
      }
  
      const newUser = await user.save();
  
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 204,
        body: JSON.stringify(newUser),
      };
    } catch (error) {
      returnError(error);
    }
};


module.exports.deleteUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findByIdAndRemove(id);
      if (!user) {
        callback(null, createErrorResponse(404, `No user found with id: ${id}, cannot delete`));
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
        body: JSON.stringify({
          message: `Removed user with id: ${user._id}`,
          user,
        }),
      };
    } catch (error) {
      returnError(error);
}};


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

module.exports.getPostsByUserId = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findById(id).populate("posts");
  
      if (!user) {
        callback(null, createErrorResponse(404, `No user found with id: ${id}`));
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
      returnError(error);
    }
};

module.exports.getOnePost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const post = await Post.findById(id);
  
      if (!post) {
        callback(null, createErrorResponse(404, `No post found with id: ${id}`));
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
      returnError(error);
    }
};


module.exports.updatePost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
  
    const { username, text, tags, limit } = data;
  
    try {
      await connectToDatabase();
  
      const post = await Post.findById(event.pathParameters.id);
  
      if (post) {
        post.username = username || post.username;
        post.text = text || post.text;
        post.tags = tags || post.tags;
        post.limit = limit || post.limit;
      }
  
      const newPost = await post.save();
  
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 204,
        body: JSON.stringify(newPost),
      };
    } catch (error) {
      returnError(error);
    }
};


module.exports.deletePost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const post = await Post.findByIdAndRemove(id);
      if (!post) {
        callback(null, createErrorResponse(404, `No post found with id: ${id}, cannot delete`));
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
        body: JSON.stringify({
          message: `Removed user with id: ${post._id}`,
          post,
        }),
      };
    } catch (error) {
      returnError(error);
}};

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


module.exports.getCommentsAtPost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const post = await Post.findById(id).populate("comment");
  
      if (!post) {
        callback(null, createErrorResponse(404, `No post found with id: ${id}`));
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
        body: JSON.stringify(post.comment),
      };
    } catch (error) {
      returnError(error);
    }
};

module.exports.getOneComment = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const comment = await Comment.findById(id);
  
      if (!comment) {
        callback(null, createErrorResponse(404, `No comment found with id: ${id}`));
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
        body: JSON.stringify(comment),
      };
    } catch (error) {
      returnError(error);
    }
};


module.exports.updateComment = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
  
    const { text } = data;
  
    try {
      await connectToDatabase();
  
      const comment = await Comment.findById(event.pathParameters.id);
  
      if (comment) {
         comment.text = text || comment.text;
      }
  
      const newComment = await comment.save();
  
      return {
        headers: {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Allow" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
          "Access-Control-Allow-Headers" : "*"
      },
        statusCode: 204,
        body: JSON.stringify(newComment),
      };
    } catch (error) {
      returnError(error);
    }
};


module.exports.deleteComment = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const comment = await Comment.findByIdAndRemove(id);
      if (!comment) {
        callback(null, createErrorResponse(404, `No comment found with id: ${id}, cannot delete`));
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
        body: JSON.stringify({
          message: `Removed comment with id: ${comment._id}`,
          comment,
        }),
      };
    } catch (error) {
      returnError(error);
}};

module.exports.getCommentsByUserId = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
  
    try {
      await connectToDatabase();
      const user = await User.findById(id).populate("posts");
      const post = await user.find({posts})
      if (!user) {
        callback(null, createErrorResponse(404, `No user found with id: ${id}`));
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
        body: JSON.stringify(user.posts.comment),
      };
    } catch (error) {
      returnError(error);
    }
};


module.exports.postLikeAtPost = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;

    const { state } = JSON.parse(
        event.body
    );

    const like = new Like({
        state      
    });

    try {
        await connectToDatabase();
        const createLike = await Like.create(like);
        const createdLike = await Post.findOneAndUpdate(
            { _id: id },
            { $push: { posts: createLike._id } },
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
            body: JSON.stringify(createdLike),
        });
    } catch (error) {
        returnError(error);
    }
};
