module.exports = (() => {
  "use strict";
  const mysql = require("mysql");
  const databases = require('./databases');

  const createPool = (config) => {
    const pool = mysql.createPool(config);
    
    const queues = [];
    let queueIndex = 0;

    for (let i = 0; i < config.queueLimit; ++i)
      queues.push(Promise.resolve());

    pool.getConnection((err) => {
      if (err) {
        console.error("!!!!!!!!!!!!!!!!!!!!!");
        console.log(config);
        console.error(err);
      }
    });

    const executeQuery = (query) => 
      new Promise((resolve, reject) => {
        pool.query(query, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

    const query = (query) => 
      new Promise((resolve, reject) => {
        const randomNumber = Math.random();
        query = query.trim();
        console.log('query:');
        console.log(query);

        queues[queueIndex] = 
          queues[queueIndex]
            .then(() => executeQuery(query))
            .then((result) => {
              resolve(result);
            })
            .catch(err => {
              console.error('Error query', err);
              reject(err);
            });

        queueIndex = (++queueIndex) % config.queueLimit;
      });

    return Object.freeze({
      query
    });
  };

  return Object
    .keys(databases)
    .reduce(
      (result, databaseName) =>
        Object.assign(
          result,
          { [databaseName]: createPool(databases[databaseName]) }),
      {});
})();
