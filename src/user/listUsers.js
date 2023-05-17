const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    let logs = []; // Crear un array para almacenar los logs
  
    let consultacrud = await mongo.client.col('Person').find().toArray();
    
    for (let i = 0; i < consultacrud.length; i++) {
      logs.push({
        hireDate: consultacrud[i].hireDate,
        surnames: consultacrud[i].surnames,
        name: consultacrud[i].name,
        nickname: consultacrud[i].nickname,
        email: consultacrud[i].email,
        location: consultacrud[i].location,
        typeOfContract: consultacrud[i].typeOfContract
      });
    }
  
    // Devolver los logs en forma de objeto JSON
    return (logs);
  }
