const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
  // Se comprueba si el usuario ha pasado por query el department y el team
    if (!query["department"]) throw new Error("El parámetro department es obligatorio");
    if (!query["team"]) throw new Error("El parámetro team es obligatorio");

    // Obtiene de la base de datos el usuario que tiene el 'skill' especificada
    let consultacrud = await mongo.client.col('Skill').find({
        department: query["department"],
        team: query["team"]
      }).toArray();
    // En caso de que sí exista, devuelve la info del usuario.
    return consultacrud;

}