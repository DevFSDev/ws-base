
const mongo = require("../index.js");
let db;
mongo.url('localhost:27017');
mongo.credentials('admin', 'admin');
mongo.schema('node-base');

mongo.initialize().then(async (r) => {
        console.log(await r.col('users').find({name: 'JROGE'}).toArray())
    }
)
