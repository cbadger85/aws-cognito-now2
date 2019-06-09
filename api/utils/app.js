const app = require('express')();
const middlewares = require('../middleware');

// const cosmosDbConfig = {
//   connectionString: `mongodb://${process.env.DB_USERNAME}.documents.azure.com:${
//     process.env.DB_PORT
//   }/${process.env.DB_NAME}?ssl=true&replicaSet=globaldb`,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASS,
// };

app.use(...middlewares);

// console.log('test');

module.exports = app;
