const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

  // Comrpobamos si los campos obligatorios están rellenados.
  if (!query["skill"]) throw new Error("La query skill es obligatoria");
  if (!query["department"]) throw new Error("La query department es obligatoria");
  if (!query["team"]) throw new Error("La query team es obligatoria");
  
  // Creamos el filtro para la consulta de actualizar.
  let filter = { skill: { $eq: query.skill } };

  // Comprobamos que la skill existe en la base de datos, en caso contrario mensaje de error.
  let exists = await mongo.client.col('Skill').findOne({ skill: query.skill });

  // Mostramos un mensaje de error en caso de que la skill no aparezca en la base de datos.
  if (!exists) throw new Error("La skill no aparece en la base de datos");

  // Creamos el documento modificado.
  const updateDocument = {
    $set: {
      department: query.department,
      team: query.team,
      skill: query.skill
    },
  };

  // Modificamos el documento en custión.
  await mongo.client.col('Skill').updateOne(filter, updateDocument);

  // Comprobamos que efectivamente se a insertado el documento modificado.
  let consultacrud = await mongo.client.col('Skill').findOne({ skill: query.skill });

  // Devolvemos el documento modificado.
  return consultacrud;
}


