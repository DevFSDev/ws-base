const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Obtiene de la base de datos todas las capabilitys.
    let consultacrud = await mongo.client.col('Capability').find().toArray();

    // Devuelve todas las capabilitys
    return consultacrud;

}