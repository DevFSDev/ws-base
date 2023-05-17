const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si el valor de la query 'nickname' tiene valor o no
    if (!query["nickname"]) throw new Error("Parámtros del query vacíos");
   
    // Obtiene el valor de la query 'nickname'.
    let nickName = query["nickname"];

    // Pasamos a minúsculas el nickname.
    let minuscultasNickname = nickName.toLowerCase();
    
    // Obtiene de la base de datos el usuario que tiene el 'nickname' especificado
    let consultacrud = await mongo.client.col('Person').findOne({nickname: minuscultasNickname});

    // Enviamos si existe o no el usuario en la base de datos.
    if (!consultacrud){
        return false;
    } else {
        return true;
    }
}
