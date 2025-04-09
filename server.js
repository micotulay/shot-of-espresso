const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', 
        pass: 'your-email-password'
    }
});

app.post('/submit-form', (req, res) => {
    const { name, eventDate, contactNumber, eventType } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com',
        subject: 'New Booking Request',
        text: `Name: ${name}\nEvent Date: ${eventDate}\nContact Number: ${contactNumber}\nEvent Type: ${eventType}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully!');
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
