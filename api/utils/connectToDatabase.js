const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let isConnected;

const connectToDatabase = () => {
  if (isConnected) {
    console.log('+++ Using existing database connection +++');
    return Promise.resolve();
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

  return mongoose
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
    })
    .catch(err => console.error(err));
};

module.exports = connectToDatabase;
