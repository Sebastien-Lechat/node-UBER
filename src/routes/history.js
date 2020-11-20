const express = require('express');
const Auth = require('../middleware/auth');
const router = express.Router();
const History = require('../models/History');
const User = require('../models/User');


router.post('/', async(req, res) => {
    // Adding a new history
    try{
        await User.findOne({ _id: req.body.user_id });
        const history = new History(req.body);
        await history.save();
        res.status(201).send({
            success: true,
        });
    }
    catch(error){
        if(error.path === "_id") return res.status(400).send({success:false,message:"Invalid user ID"});
        return res.status(400).send({success:false,message:error});
    }
})

// route de suppression
router.delete('/', async(req, res) => {
    try{
        await User.findOne({ _id: req.body.user_id });
        const history = new History(req.body);
        await History.deleteOne(history);
        res.status(201).send({
            success: true,
        });
    }
    catch(error){
        if(error.path === "_id") return res.status(400).send({success:false,message:"Invalid user ID"});
        return res.status(400).send({success:false,message:error});
    }
})

// route de récupération (par utilisateur) des courses 



module.exports = router;