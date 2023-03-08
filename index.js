const api = require("./lib/api");

api.get("/user", require("./src/test/get_test"));


api.start();