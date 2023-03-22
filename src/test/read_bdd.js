const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
  
    let respuesta = query["read"];
    let consultacrud = await mongo.client.col('People').find({Name: respuesta}).toArray()

    return consultacrud;
}
