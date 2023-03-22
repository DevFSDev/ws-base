const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    let respuesta = query["put"];
    let resultado = JSON.parse(respuesta);
    

    await mongo.client.col('People').insertOne({
      Name: resultado.name,
      Skill: resultado.skill,
      Work: resultado.work,
      Project: resultado.project,
    });
    
    return (respuesta)

  }