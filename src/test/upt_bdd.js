const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    let respuesta = query["upt"];
    let resultado = JSON.parse(respuesta);
    let filter = {Name: {$eq:resultado.nameModify}};
    console.log(resultado)
    console.log(filter)

    const updateDocument = {
        $set: {
           Name: resultado.name,
           Skill: resultado.skill,
           Work: resultado.work,
           Project: resultado.project
        },
     };
    console.log(updateDocument)

    await mongo.client.col('People').updateOne(filter,  updateDocument);

    return (respuesta)
    
  }
