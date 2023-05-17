const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Obtiene de la base de datos todas las experiencias que hay.
    let consultacrud = await mongo.client.col('Experiency').find().toArray();

    // En caso de que sí exista, devuelve la info del usuario.
    return consultacrud;

}