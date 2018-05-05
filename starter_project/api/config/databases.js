module.exports = (() => {
  "use strict";

  return {
    Extension: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      debug: false,
      connectionLimit: 33,
      queueLimit: 33,
      dateStrings: true
    }
  };
})();
