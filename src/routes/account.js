const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Auth = require('../middleware/auth');
const sendEmail = require('../utils/mail');
const router = express.Router()

router.post('/register', async(req, res) => {
    // Create a new account
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

router.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password, code } = req.body;
        if (!email) return res.status(400).send({ success: false, message: 'Missing email' });
        if (!password) return res.status(400).send({ success: false, message: 'Missing password' });

        const user = await User.findByCredentials(email, password);
        if (!user) return res.status(401).send({ success: false, message: 'Login failed! Check authentication credentials' });

        if (!user.verify_email || !user.verify_email.verified)
            return res.status(400).send({ success: false, message: 'Email address not verified' });

        if (user.verify_phone && user.verify_phone.verified && user.double_authentification && user.double_authentification.activated) {
            if (!code) return res.status(400).send({ success: false, message: 'Double authentification is activated, code is required' });
            const time = (Date.now() - user.double_authentification.date) / 1000;
            if (time > 600) return res.status(400).send({ success: false, message: 'Code is no longer valid' });
            if (user.double_authentification.code != code) {
                return res.status(400).send({ success: false, message: 'Double authentification is activated, wrond code' });
            }
        }

        const ret = await user.generateAccountJSON();
        ret.success = true;
        ret.token = await user.generateAuthToken();
        ret.refresh_token = await user.generateAuthRefreshToken();

        res.send(ret);
    } catch (error) {
        error.success = false;
        res.status(400).send(error);
    }
})

router.post('/request-double-authentification', async(req, res) => {
    // Request code for double authentification
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).send({ success: false, message: 'Missing email' });
        if (!password) return res.status(400).send({ success: false, message: 'Missing password' });

        const user = await User.findByCredentials(email, password);
        if (!user) return res.status(401).send({ success: false, message: 'Login failed! Check authentication credentials' });

        if (!user.verify_email || !user.verify_email.verified)
            return res.status(400).send({ success: false, message: 'Email address not verified' });

        if (!await user.doubleAuthentification()) return res.status(400).send({ success: false });
        res.send({ success: true });
    } catch (error) {
        error.success = false;
        res.status(400).send(error);
    }
})

router.post('/double-authentification', async(req, res) => {
    // Request code for double authentification
    try {
        const { allow } = req.body;
        const user = req.user;

        if (allow === undefined) return res.status(400).send({ success: false, message: 'Invalid body' });

        user.double_authentification = { activated: allow }
        await user.save();

        res.send({ success: true });
    } catch (error) {
        error.success = false;
        res.status(400).send(error);
    }
})

router.post('/request-verify-email', async(req, res) => {
    // Login a registered user
    try {
        const { email } = req.body;
        if (!email) return res.status(400).send({ success: false, message: 'Invalid body' });

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send({ success: false });
        console.log(1)
        const verify_email = await user.generateEmailVerifyCode();
        if (!verify_email) return res.status(400).send({ success: false });

        sendEmail(user.email, 'no-reply', user.name, verify_email.code);
        res.send({ success: true });
    } catch (error) {
        console.log(error)
        error.success = false;
        res.status(400).send(error);
    }
})

router.post('/verify-email', async(req, res) => {
    // Verify email adress
    try {
        const { email, code } = req.body;
        if (!email || !code) return res.status(400).send({ success: false, message: 'Invalid body' });

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send({ success: false });

        if (!user.verify_email || !user.verify_email.code || user.verify_email.verified) return res.status(400).send({ success: false });

        const time = (Date.now() - user.verify_email.date) / 1000;
        if (time > 600) return res.status(400).send({ success: false, message: "Code is no longer valid" });

        if (user.verify_email.code !== code) return res.status(400).send({ success: false });

        user.verify_email.verified = true;
        user.verify_email.code = undefined;
        user.verify_email.date = undefined;
        await user.save();

        res.send({ success: true });
    } catch (error) {
        error.success = false;
        res.status(400).send(error);
    }
})

router.get('/', async(req, res) => {
    // View logged in user profile
    const user = req.user;

    const ret = await user.generateAccountJSON();
    ret.success = true;

    res.send(ret);
})

router.put('/', async(req, res) => {
    // Edit user profile
    try {
        const user = req.user;

        const { email, name, phone, picture, password } = req.body;

        if (!password) return res.status(400).send({ success: false, message: 'Invalid body' });
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(400).send({ success: false, message: 'Invalid login credentials' });

        if (email && email != user.email) user.verify_email = undefined;
        if (phone && phone != user.phone) user.verify_phone = undefined;
        if (!phone && user.phone) user.double_authentification = undefined;

        if (!email && !name && !phone && !picture) return res.status(400).send({ success: false, message: 'Invalid body' });
        if (email) user.email = email;
        if (picture) user.picture = picture;
        if (name) user.name = name;
        if (phone) user.phone = phone;

        await user.save();

        const ret = await user.generateAccountJSON();
        ret.success = true;

        res.send(ret);
    } catch (error) {
        res.status(400).send({ success: false });
    }
})

router.delete('/phone', async(req, res) => {
    const user = req.user;

    user.phone = undefined;
    user.verify_phone = undefined;

    await user.save();

    res.send({ success: true });
});

module.exports = router;
