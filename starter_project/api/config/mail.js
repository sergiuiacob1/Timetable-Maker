module.exports = (() => {
    "use strict";

    return {
        key: process.env.MAIL_API_KEY,
        domain: process.env.MAIL_DOMAIN,
        account: process.env.MAIL_ACCOUNT
    };
  })();
  