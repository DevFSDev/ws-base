const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comrpobamos si los campos obligatorios están rellenados.
    if (!query["department"]) throw new Error("La query department es obligatoria");
    if (!query["team"]) throw new Error("La query team es obligatoria");
    if (!query["skill"]) throw new Error("La query skill es obligatoria");

    // Comprobamos si ya existe esa skill.
    let exist = await mongo.client.col('Skill').findOne({ skill: query.skill });

    // En caso de que ya exista la skill devuelve un error.
    if (exist) throw new Error("Esa skill ya existe en la BBDD");

    // Insertamos el valor del body a la base de datos.
    await mongo.client.col('Skill').insertOne({
        department: query.department,
        team: query.team,
        skill: query.skill,

    });

    // Obtenemos de la base de datos la skill insertada.
    let consultacrud = await mongo.client.col('Skill').findOne({ skill: query.skill });

    // Combrueba que la skill se ha insertado correctamente.
    if (!consultacrud) throw new Error("No se ha insertado correctamente la skill");

    // En caso de que sí exista, devuelve la info de la skill, en caso contrario devuelve un error.
    return consultacrud;

}

