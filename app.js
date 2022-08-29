const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(cors())


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const userRoutes = require('./routes/Users');
app.use('/users', userRoutes); 

const PORT = 9000
app.listen(PORT, () => {
	console.log(`Server running on port-: http://localhost:${PORT}`)
});