const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user:process.env.ODE_CODE,
        pass:NODE_CODE_SENDING_EMAIL_PASSWORD
    },
});

module.exports = transport;