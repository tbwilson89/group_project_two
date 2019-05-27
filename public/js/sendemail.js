"use strict";
const nodemailer = require("nodemailer");
var schedule = require('node-schedule');
var date = new Date(2019, 4, 22, 19, 45, 0);
var j = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');

    // async..await is not allowed in global scope, must use a wrapper
    async function main(){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: 'TRRCregulatory@gmail.com',
          pass: 'regulatory1'
      }
  });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Yo Momma" <mommasays@wakeup.com>', // sender address
      to: "mattomadison@gmail.com, madison@madisonandwright.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);
});


