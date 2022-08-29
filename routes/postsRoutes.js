const express = require('express');
const router = express.Router();

const Posts = require('../models/Post');

const connectToDatabase = require('../database/db');

router.post('/', async (req, res) => {
    const post = new Posts({
        userId: req.user.id,
        text: req.body.text,
        tags: req.body.tags
    })

    try {
        await connectToDatabase();
        const savePost = post.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.send(error)
    }
})

//get

//patch 

//delete