const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const nodemailer = require("nodemailer");
require('dotenv').config();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/petsitter'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

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
    let bookingRequest = req.body;

    console.log(bookingRequest);

    sendMail(bookingRequest, (err, info) => {
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

const sendMail = (bookingRequest, callback) => {

    var html = '<p>Name: ' + bookingRequest.name + '</p>';
    html += '<p>Email: ' + bookingRequest.email + '</p>';
    html += '<p>Phone: ' + bookingRequest.phone + '</p>';
    html += '<p>Message: ' + bookingRequest.message + '</p>';

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: process.env.USER_EMAIL,
        // cc: user.ccMail,
        subject: 'Booking request: ' + bookingRequest.name,
        html: html
    };
    // if (bookingRequest.file !== null && bookingRequest.file !== undefined) {
    //     mailOptions.attachments = [{
    //         filename: bookingRequest.fileName,
    //         path: bookingRequest.file
    //     }]
    // }
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
