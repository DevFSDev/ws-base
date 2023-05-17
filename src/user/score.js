const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si el valor de la query 'nickname' tiene valor o no
    if (!query["nickname"]) throw new Error("Parámtros del query vacíos");

    // Obtiene el valor de la query 'nickname'.
    let nickName = query["nickname"];
    let minuscultasNickname = nickName.toLowerCase();

    // Obtiene de la base de datos el usuario que tiene el 'nickname' especificado
    let consultacrud = await mongo.client.col('PersonSkill').findOne({ nickname: minuscultasNickname });

    // Combrueba que existe el usuario en la base de datos. En caso de que no exista, devuelve un error.
    if (!consultacrud) throw new Error("El usuario no aparece en la base de datos");

    // Sumamos la puntuación total que obtiene el usuario.
    let suma = 0; // La suma total del score.
    for (const [key, value] of Object.entries(consultacrud.skills)) {
        suma += value;
    }
    
    return suma;

}