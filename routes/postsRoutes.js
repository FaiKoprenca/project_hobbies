const express = require('express');
const router = express.Router();

const Posts = require('../models/Post');

const connectToDatabase = require('../database/db');

router.post('/', async (req, res) => {
    const post = new Posts({
        userId: req.user.id,
        text: req.body.text
    })
})

//get

//patch 

//delete