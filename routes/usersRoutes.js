
const express = require('express');
const router = express.Router();

const User = require('../models/User');

const connectToDatabase = require('../database/db');

router.get('/', async (req, res) => {
    try {
        await connectToDatabase()
        const result = await User.find()
        if (!result) {
            res.json({
                status: "Failed",
                message: "not found records"
            })
        }
        else {
            res.json({
                status: 'SUCCESS',
                message: "record found",
                data: result
            })
        }

    } catch (errors) {
        res.send('ERROR' + errors)
    }

});

router.post('/', async (req, res) => {
    await connectToDatabase();
    const u = await User.findOne({ firstName: req.body.firstName })
    if (u) {
        return res.status(400).json("this user already exists")
    }
    else {
        const user = new User({
            firstName: req.body.firstName
        })
        try {
            const saveData = user.save();
            res.json(saveData); //TODO fix json data not showing

        } catch (err) {
            res.send(err)
        }
    }
});

module.exports = router;