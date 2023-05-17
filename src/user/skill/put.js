const e = require('express');
const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
  // Comprueba si el valor de la query 'nickname' tiene valor o no
  if (!query["nickname"]) throw new Error("El parámtro nickname es obligatorio");
  if (!query["skill"]) throw new Error("El parámtro skill es obligatorio");
  if (!query["level"]) throw new Error("El parámtro level es obligatorio");

  // Pasamos a minusculas el nickName
  let nickname = query.nickname.toLowerCase();
  let filter = { nickname: { $eq: nickname } };

  // Combrueba que existe el usuario en la base de datos. En caso de que no exista, devuelve un error.
  let asociacion = await mongo.client.col('PersonSkill').findOne({ nickname });
  if (!asociacion) throw new Error("El usuario no aparece en la base de datos");

  // Se comprueba que la skill que se quiere asociar ya existe en la base de datos
  let skill = query.skill;
  let consultaSkill = await mongo.client.col('Skill').findOne({ skill });
  if (!consultaSkill) throw new Error("Esa skill no aparece en la base de datos");

  // Se comprueba que el nivel de la habilidad cumple las condiciones (int c- [1;4])
  let level = parseInt(query.level);
  if (level === NaN) throw new Error("No has introducido un número");
  if (level < 1 || level > 4) throw new Error("El nivel de skill no esta en el rango correcto (1-4)");

  // Se comprueba si esa skill está asociada al usuario.
  asociacion = await mongo.client.col('PersonSkill').findOne({ nickname });
  if (!asociacion.skills[skill]) throw new Error("Esa skill no está asociada al usuario");

  // Asocia efectivamente la habilidad al usuario con el nivel indicado.
  asociacion.skills[skill] = level;

  const updateDocument = {
    $set: asociacion,
  };

  await mongo.client.col('PersonSkill').updateOne(filter, updateDocument);

  // Devuelve la información de la asociación.
  return asociacion.skills;

}


