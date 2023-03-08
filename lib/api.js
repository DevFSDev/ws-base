const api = require('nexo-npm-api');
const logger = require('nexo-npm-node-logger')

api.port(9000);

api.onInitialize((port) => {
    logger.i(`-- SERVER RUNNING ON PORT ${port} --`);
});

module.exports = api;

/*
api.post("/test", (req) => {
    try {
        console.log(req.body.nombre)
        errors.exceptBody(Object.values(req.body).length)
        errors.exceptRegex("nombre", req.body.nombre, /^[\S\s]{1,5}$/)
        return { mensaje: "Guardado" }
    } catch (e) {
        console.log(e)
        return e
    }

});
*/