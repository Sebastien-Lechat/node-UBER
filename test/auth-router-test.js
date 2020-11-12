const express = require('express');
const User = require('../src/models/User');

const router = express.Router()

router.get('/getVerifiedCode', async (req, res) => {
    // Get a list of all users
    try {
        const { email } = req.body;
        if (!email) return res.status(400).send({ success: false });

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send({ success: false });

        const code = user.verify_email.code;        

        res.status(200).send({ success: true, code: code });
    } catch (error) {
        error.success = false;
        res.status(400).send(error);
    }
})

module.exports = router;