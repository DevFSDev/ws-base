const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Comprueba si el valor de la query 'department' tiene valor o no
    if (!query["department"]) throw new Error("Parámtros del query vacíos");

    // Obtiene de la base de datos aquellos teams que se han buscado por departamento.
    let consultacrud = await mongo.client.col('Team').find({ department: query["department"] }).toArray();

    // En caso de que sí exista, devuelve la info del usuario.
    return consultacrud;

}