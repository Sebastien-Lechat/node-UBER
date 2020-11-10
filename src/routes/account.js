const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Auth = require('../middleware/auth');
const router = express.Router()

router.post('/', async(req, res) => {
    // Create a new account
    console.log(req.body);
    try {
        const user = new User(req.body);
        user.double_authentification = { activated: false }
        await user.save();
        res.status(201).send({
            success: true,
            name: user.name,
            email: user.email,
            phone: user.phone,
            id: user._id
        });
    } catch (error) {
        error.success = false;
        console.log(error)
        res.status(400).send(error);
    }
})

module.exports = router;
