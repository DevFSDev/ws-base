const api = require("./lib/api");
const db = require("./lib/mongo")


api.get("/user", require("./src/test/get_test"));

api.get("/read", require("./src/test/read_bdd")); 
api.get("/delete", require("./src/test/del_bdd")); 
api.get("/insert", require("./src/test/put_bdd")); 
api.get("/update", require("./src/test/upt_bdd")); 



api.start();