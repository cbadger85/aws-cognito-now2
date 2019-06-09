const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let isConnected;

const connectToDatabase = (req, res, next) => {
  if (isConnected) {
    console.log('+++ Using existing database connection +++');
    next();
  }

  console.log('+++ Using new database connection +++');

  const cosmosDbConfig = {
    connectionString: `mongodb://${
      process.env.DB_USERNAME
    }.documents.azure.com:${process.env.DB_PORT}/${
      process.env.DB_NAME
    }?ssl=true&replicaSet=globaldb`,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
  };

  mongoose
    .connect(cosmosDbConfig.connectionString, {
      useNewUrlParser: true,
      auth: {
        user: cosmosDbConfig.user,
        password: cosmosDbConfig.password,
      },
    })
    .then(db => {
      isConnected = db.connections[0].readyState;
      console.log('+++ Connection to CosmosDB successful +++');
      next();
    })
    .catch(err => next(err));
};

module.exports = connectToDatabase;
