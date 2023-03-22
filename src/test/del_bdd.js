const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
  
    let respuesta = query["del"];
    
    await mongo.client.col('People').deleteOne({Name: respuesta})

    return (respuesta);
}

