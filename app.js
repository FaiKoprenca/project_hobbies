const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const connectToDatabase = require('./database/db');

/*const DB_USER = 'memories';
const PASSWORD = encodeURIComponent(process.env.MONGO_ATLAS_PW);
const url = `mongodb+srv://${DB_USER}:${PASSWORD}@hobbies.xqzaqqu.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url,
  {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to database !!');
  })
  .catch((err)=>{
    console.log('Connection failed !!'+ err.message);
  });*/