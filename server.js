const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require('dotenv').config();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/hsapp'));

app.use(bodyParser.json());

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/api/sendRequest2", (req, res) => {
    let user = req.body;
    console.log(user.toMail);
    console.log(user.subject);
    console.log(user.html);

    res.send(user);
})

app.post("/api/sendRequest", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, (err, info) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: "Failed to send email" });
            return;
        }

        console.log("Email has been sent");
        res.send(info);
    });
});

const sendMail = (user, callback) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: user.toMail,
        cc: user.ccMail,
        subject: user.subject,
        html: user.html
    };
    if (user.file !== null && user.file !== undefined) {
        mailOptions.attachments = [{
            filename: user.fileName,
            path: user.file
        }]
    }
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASSWORD
        }
    });

    transporter.sendMail(mailOptions, callback);
}

app.listen(process.env.PORT || 8080);
