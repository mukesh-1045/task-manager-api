// const sgMail = require('@sendgrid/mail')
// tryed with sendgrid


// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//     to: 'mukeshkumar.buldak12@gmail.com',
//     form: 'mukeshkumar.buldak12@gmail.com',
//     subject: 'This is my First mail through sendgrid',
//     text: 'hello , bro go get it'
// }

// sgMail
//     .send(msg)
//     .then((response) => {
//         console.log(response[0].statusCode)
//         console.log(response[0].headers)
//     })
//     .catch((error) => {
//         console.error(error)
//     })

const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
});

const sendWelcomeEmail = (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Thanks for Joining Task-Manager',
        text: `Welcome to Our App, ${name}. Let me know how you get along with the app`,
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('email send');
        }
    });
}


const sendCancelEmail = (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Thanks for using Task-Manager',
        text: `Thank you to use my App, ${name}. Good bye but let me know if i can do something to get you again here!!!!!`,
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('email send');
        }
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

