const api = require("./lib/api");
const db = require("./lib/mongo")


api.get("/user", require("./src/test/get_test"));
api.get("/db", require("./src/test/get_test_bdd")); 



api.start();