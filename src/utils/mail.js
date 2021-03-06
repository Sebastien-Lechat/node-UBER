const nodemailer = require('nodemailer');

const sendEmail = (destination, subject, name, code) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'uber.eedsi.noreply@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'UBER - EEDSI',
        to: destination,
        subject: subject,
        text: name + " : votre code de vérification UBER-EEDSI est : " + code + ". \nCe code est valide pendant 10 minutes.\n\nSi vous n'avez pas effectué de demande ignorez ce message."
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw({success: false, message: 'Internal server error : EMAIL'})
        } else {
            // console.log('Email sent: ' + info.response);
            // console.log(mailOptions)
        }
    });
}

module.exports = sendEmail;