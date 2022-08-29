
const express = require('express');
const router = express.Router();

const User = require('../models/User');

const connectToDatabase = require('../database/db');

router.get('/', async(req, res) => {
    try{
        await connectToDatabase()
        const result = await User.find()
        if(!result){
            res.json({
                status: "Failed", 
                message: "not found records"
            })
        }
        else{
            res.json({
                status: 'SUCCESS',
                message: "record found",
                data: result
            })
        }

    }catch(errors)
    {
        res.send('ERROR' + errors)
    }
    
});

router.post('/', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName
    })
    try {
        await connectToDatabase();
        const saveData = await user.save()
        res.json(saveData)
    } catch (err) {
        res.send('Error')
    }
});

module.exports = router;