 module.exports = (() => {
    'use strict';
  
    const Mailgun = require('mailgun-js');
    const config = require('./../config/mail');

    class MailService {
        constructor(config) {
            if (config) {
                this.key     = config.key;
                this.domain  = config.domain;
                this.account = config.account;
                this.mailgun = new Mailgun({apiKey: config.key, domain: config.domain});
            } 
        }

        sendMail (mail, subject, message) {
            if (mail) {
                var data = {
                      from: this.account,
                      to: mail,
                      subject: subject,
                      html: message
                }
                this.mailgun.messages().send(data, function (err, body) {
                    if (err) {
                        console.log("got an error: ", err);
                    }
                    else {
                        console.log(body);
                    }   
                });
            }
        };

        sendResetPasswordMail(mail, password) {
            this.sendMail(mail, '[TimetableMaker] Your password has been reset.', '\tTimetable password has been reset. \n \tYour new password is:\n ' + password + ' \n \tYou can now log in');
        };

    };
  
    return new MailService(config);
  })();