const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Obtenemos el conteo de personas que hay en la BBDD "person".
    let totalPersonas = await mongo.client.col('Person').count();

    // Lo enviamos al cliente.
    return {totalPersonas};

}
