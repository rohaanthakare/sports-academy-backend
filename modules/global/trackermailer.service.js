const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const HelperService = require('../global/helper.service');
const hbs = require('nodemailer-express-handlebars');
const base64img = require('base64-img');
const User = require('../user/models/user.model');
const imgsrc = base64img.base64Sync('./public/images/tracker-light.png');

let transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
}));

transporter.use('compile', hbs({
    viewEngine : {
        extname: '.hbs', // handlebars extension
        layoutsDir: 'public/MailTemplates', // location of handlebars templates
        defaultLayout: 'default', // name of main template
        partialsDir: 'public/MailTemplates/common', // location of your subtemplates aka. header, footer etc
    },
    viewPath: 'public/MailTemplates',
    extName: '.hbs'
}));

module.exports = {
    sendActivationMail,
    sendResetPassLinkMail,
    sendTrackerInviteMail,
    testMailTemplate
}

async function testMailTemplate(req, res) {
    let user = await User.findOne({
        username: 'demo'
    });
    user.emailId = 'rohaanthakare@gmail.com';
    switch(req.body.name) {
        case 'ACTIVATION_MAIL': 
            await sendActivationMail(user);
        break;

        case 'INVITATION_MAIL':
            await sendTrackerInviteMail(user);
        break;

        case 'RESET_PASSWORD_MAIL':
            await sendResetPassLinkMail(user);
        break;
    }
    res.send({
        status: true,
        message: 'Template mail sent'
    });
}

async function sendActivationMail(userInfo) {
    let mailParams = {};
    if (userInfo.firstName) {
        mailParams.displayName = HelperService.convertToTitleCase(userInfo.firstName);
    } else {
        mailParams.displayName = HelperService.convertToTitleCase(userInfo.username);
    }
    mailParams.activationLink = `${process.env.APP_URL}activate-by-otp/${userInfo._id}`;
    const otpString = (userInfo.activation_otp) ? userInfo.activation_otp.toString() : '111111';
    mailParams.userOtp = `${otpString.slice(0, 3)}-${otpString.slice(3, 6)}`;
    console.log('----------mailParams-----------');
    console.log(mailParams);
    let mailOptions = {
        from: 'Tracker <trackermaster1912@gmail.com>',
        to: userInfo.emailId,
        subject: 'Tracker - Account Activation',
        attachments: [{
            filename: 'Tracker.png',
            content: imgsrc.split("base64,")[1],
            encoding: 'base64',
            cid: 'tracker-logo'
        }],
        template: 'user-activation',
        context: {
            name: mailParams.displayName,
            activationUrl: mailParams.activationLink,
            userOtp: mailParams.userOtp
        }
    };
    
    return await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('-----------------sendMail-------------------');
        console.log(mailOptions);
        // console.log('Message sent: ' + info.messageId, info.response);
    });
}

async function sendResetPassLinkMail(userInfo) {
    let mailParams = {};
    if (userInfo.firstName) {
        mailParams.displayName = HelperService.convertToTitleCase(userInfo.firstName);
    } else {
        mailParams.displayName = HelperService.convertToTitleCase(userInfo.username);
    }
    mailParams.resetPassLink = `${process.env.APP_URL}reset-pass/${userInfo._id}`;
    let mailOptions = {
        from: 'Tracker <trackermaster1912@gmail.com>',
        to: userInfo.emailId,
        subject: 'Tracker - Password Reset',
        template: 'reset-password',
        attachments: [{
            filename: 'Tracker.png',
            content: imgsrc.split("base64,")[1],
            encoding: 'base64',
            cid: 'tracker-logo'
        }],
        context: {
            name: mailParams.displayName,
            resetPasswordLink: mailParams.resetPassLink
        }
    };
    
    return await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

async function sendTrackerInviteMail(userInfo) {
    const finimgsrc = base64img.base64Sync('./public/images/finance.png');
    const contactimgsrc = base64img.base64Sync('./public/images/contact.png');
    const groceryimgsrc = base64img.base64Sync('./public/images/grocery.png');
    let mailOptions = {
        from: 'Tracker <trackermaster1912@gmail.com>',
        to: userInfo.emailId,
        subject: 'Tracker - User Invite',
        attachments: [{
            filename: 'Tracker.png',
            content: imgsrc.split("base64,")[1],
            encoding: 'base64',
            cid: 'tracker-logo'
        }, {
            filename: 'Finance.png',
            content: finimgsrc.split("base64,")[1],
            encoding: 'base64',
            cid: 'finance-icon'
        }, {
            filename: 'Contact.png',
            content: contactimgsrc.split("base64,")[1],
            encoding: 'base64',
            cid: 'contact-icon'
        }, {
            filename: 'Grocery.png',
            content: groceryimgsrc.split("base64,")[1],
            encoding: 'base64',
            cid: 'grocery-icon'
        }],
        template: 'user-invite'//,
        // context: {
        //     name: mailParams.displayName,
        //     activationUrl: mailParams.activationLink
        // }
    };
    
    return await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}