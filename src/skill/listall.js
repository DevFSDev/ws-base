const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Obtiene de la base de datos todas las skills existentes.
    let consultacrud = await mongo.client.col('Skill').find().toArray();
    
    // Devuelve la info al usuario.
    return consultacrud;

}