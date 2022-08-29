const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(cors())


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const userRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const likeRoutes = require('./routes/likeRoutes');
app.use('/users', userRoutes); 
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);
app.use('/likes', likeRoutes);

const PORT = 9000
app.listen(PORT, () => {
	console.log(`Server running on port-: http://localhost:${PORT}`)
});