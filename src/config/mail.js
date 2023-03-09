const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
        user: "etteremrf1@outlook.com",
        pass: "8qHRM6LJpUsPFAQn",
    },
});

const mailOptions = {
    from: 'etteremrf1@outlook.com',
    to: '',
    subject: 'Étterem [RF1 projekt]',
    text: 'Sikeres regisztráció! Jó étvágyat!'
};

module.exports.mailData = {
    transporter:transporter,
    mailOptions:mailOptions
}
