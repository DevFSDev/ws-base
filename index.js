const api = require("./lib/api");
const db = require("./lib/mongo")

api.get("/user", require("./src/user/get")); 
api.del("/user", require("./src/user/del")); 
api.post("/user", require("./src/user/post")); 
api.put("/user", require("./src/user/put")); 
api.get("/user/list", require("./src/user/list"));
api.get("/user/count", require("./src/user/count"));
api.get("/user/exist", require("./src/user/exist"));
api.get("/user/score", require("./src/user/score"));
api.get("/user/maxScore", require("./src/user/maxScore"));
api.get("/user/listUsers", require("./src/user/listUsers"));

api.get("/skill", require("./src/skill/get")); 
api.del("/skill", require("./src/skill/del")); 
api.post("/skill", require("./src/skill/post")); 
api.put("/skill", require("./src/skill/put")); 
api.get("/skill/list", require("./src/skill/list"));
api.get("/skill/listall", require("./src/skill/listall"));

api.get("/user/skill", require("./src/user/skill/get")); 
api.get("/user/skill/person", require("./src/user/skill/getSkill")); 
api.get("/user/skill/listQuantity", require("./src/user/skill/listQuantity"));
api.del("/user/skill", require("./src/user/skill/del"));
api.del("/user/delSkill", require("./src/user/skill/delSkill"));  
api.post("/user/skill", require("./src/user/skill/post")); 
api.post("/user/skillArray", require("./src/user/skill/postArray")); 
api.put("/user/skill", require("./src/user/skill/put")); 

api.get("/department/list", require("./src/department/list"));
api.post("/department/listQuantity", require("./src/department/listQuantity")); 

api.get("/team/list/teams", require("./src/team/listTeams")); 
api.get("/team/list", require("./src/team/list")); 
api.get("/team/listQuantity", require("./src/team/listQuantity")); 

api.get("/project", require("./src/project/get"));
api.get("/project/list", require("./src/project/list"));
api.get("/project/capability", require("./src/project/capability"))

api.get("/capability", require("./src/capability/get"));
api.get("/capability/list", require("./src/capability/list"));

api.get("/experiency", require("./src/experiency/get"))
api.get("/experiency/list", require("./src/experiency/list"))
api.get("/experiency/on", require("./src/experiency/on"))

api.get("/colors/all", require("./src/color/get"))


api.start();