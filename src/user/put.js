const e = require('express');
const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
  
  // Comprueba si el valor de la query 'nickname' tiene valor o no
  if (!query["nickname"]) throw new Error("Parámtros del query vacíos");

  // Pasamos a minusculas el nickName
  let nickname =  query.nickname.toLowerCase();

  // Creamos un filtro para actualizar el campo.
  let filter = { nickname: { $eq: nickname } };

  // Creamos una consulta para saber si existe esa persona con ese nickname específico.
  let exists = await mongo.client.col('Person').findOne({ nickname });

  // Combrueba que existe el usuario en la base de datos. En caso de que no exista, devuelve un error.
  if (!exists) throw new Error("El usuario no aparece en la base de datos");

  // Comprueba si el valor del body tiene valor o no.
  if (!body) throw new Error("Parámtros del body vacíos");

  // Comrpobamos si los campos obligatorios están rellenados.
  if (!body.name) throw new Error("El parámetro name es obligatorio");
  if (!body.surnames) throw new Error("El parámetro surnames es obligatorio");
  if (!body.profile) throw new Error("El parámetro profile es obligatorio");

  // Insertamos a la base de datos el usuario.
  const updateDocument = {
    $set: {
      name: body.name,
      surnames: body.surnames,
      location: body.location,
      profile: body.profile,
      idSAP: body.idSAP,
      numSAP: body.numSAP,
      hireDate: body.hireDate,
      profile: body.profile,
      typeOfContract: body.typeOfContract,
      CV: body.CV,
    },
  };
  await mongo.client.col('Person').updateOne(filter, updateDocument);

  // Obtenemos de la base de datos el usuario actualizado.
  let consultacrud = await mongo.client.col('Person').findOne({ nickname });

  // En caso de que sí exista en la bbdd y se rellenen los campos obligatorios, devuelve la info del usuario.
  return consultacrud;
}


