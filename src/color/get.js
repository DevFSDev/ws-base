const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Obtiene de la base de datos todos los departamentos.
    let consultacrud = await mongo.client.col('Colors').find().toArray();

    // Devuelve todos los departamentos
    return consultacrud;

}