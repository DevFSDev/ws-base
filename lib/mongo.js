const mongo = require('nexo-npm-node-mongo');
const logger = require('nexo-npm-node-logger');

mongo.url("127.0.0.1:9001");

mongo.credentials("admin", "admin");
mongo.schema("my_db");

mongo.onConnected(() => {
    logger.i("Connected to the database");
});
mongo.onFailure((err) => {
    logger.e("Unable to connect to the database", err)
});


mongo.initialize().then(async () => {

}

)

