const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise;

module.exports = connectDataBase = async () => {
    try {
        const DB_USER = 'memories';
        const PASSWORD = encodeURIComponent(process.env.MONGO_ATLAS_PW);

        const urlAtlas = `mongodb+srv://${DB_USER}:${PASSWORD}@hobbies.xqzaqqu.mongodb.net/?retryWrites=true&w=majority`;
        mongoose.connect(urlAtlas, { useNewUrlParser: true });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};