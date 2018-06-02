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
                this.url     = 'http://89.34.92.135/login.html';
                this.acceptedMails = [this.account, 'medvichi.stefan@gmail.com'];
            } 
        }

        sendMail (mail, subject, message) {
            if (mail && this.acceptedMails.indexOf(mail) > -1) {
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

        sendResetPasswordMail({mail, password}) {
            console.log(mail)
            this.sendMail(mail, `[TimetableMaker] Resetare Parola`, `Parola contului dumneavoastra a fost resetata. <br> Noua parola este:<br> <b>${password}</b>
            <br>Puteti accesa contul <a href="${this.url}">aici</a>.`);
        };

    };
  
    return new MailService(config);
  })();