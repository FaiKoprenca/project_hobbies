const connectToDatabase = require('../../database/db');
const User = require('../../models/User');

module.exports.checkUserExists = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const cognitoId = event.pathParameters.cognitoId;

    const { username, location, bio } = JSON.parse(event.body); //if user dosent exist

    try {
        const user = User.findOne(cognitoId);

        if (user) {
            console.log("!!!!!!!!!!!!!!!!!!!!! EXISTS !!!!!!!!!!!!!!!!!!!!!!!!!!")
        } else {
            User.init();
            const user = new User({
                username,
                location,
                bio,
            });
            const newUser = await User.create(user);

            return {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Allow": "GET, OPTIONS, POST",
                    "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                    "Access-Control-Allow-Headers": "*"
                },
                statusCode: 200,
                body: JSON.stringify(newUser),
            };
        }
    }
    catch (error) {
        return (error);
    }
}
