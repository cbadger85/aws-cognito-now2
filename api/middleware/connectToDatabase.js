const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let isConnected;

const connectToDatabase = async (req, res, next) => {
  if (isConnected) {
    console.log('+++ Using existing database connection +++');
    return next();
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

  const db = await mongoose.connect(cosmosDbConfig.connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    auth: {
      user: cosmosDbConfig.user,
      password: cosmosDbConfig.password,
    },
  });

  isConnected = db.connections[0].readyState;

  console.log('+++ Connection to CosmosDB successful +++');

  return next();
};

module.exports = connectToDatabase;
