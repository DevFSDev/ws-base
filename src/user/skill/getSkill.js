const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    let asociacion;
    let level = 0;
    let nombres = [];
    let resultados = {};

    // Comprueba si el valor de la query 'nickname' tiene valor o no
    if (!query["skill"]) throw new Error("Parámtros del query vacíos");

    // Obtiene el valor de la query 'nickname'.
    let skill = query["skill"];

    if (skill === "C  ") {
        skill = "C++"
    }

    // Obtiene de la base de datos todos los usuarios que tienen la habilidad especificada
    let consultacrud = await mongo.client.col('PersonSkill').find({ [`skills.${skill}`]: { $gt: 0 } }).toArray();

    // Comprueba que existen usuarios en la base de datos. En caso de que no exista, devuelve un error.
    if (!consultacrud || consultacrud.length === 0) throw new Error("No se encontraron usuarios con esa habilidad");

    // Crea un array con los nickname de cada usuario encontrado
    let nicknames = consultacrud.map(user => user.nickname);

    // Obtiene de la base de datos el usuario que tiene el 'nickname' especificado
    for (let i = 0; i < nicknames.length; i++) {
        nombres = await mongo.client.col('Person').findOne({ nickname: nicknames[i] });
        asociacion = await mongo.client.col('PersonSkill').findOne({ nickname: nicknames[i] });

        // Asocia efectivamente la habilidad al usuario con el nivel indicado.
        level = asociacion.skills[skill]

        // Agrega el nuevo par clave-valor al objeto de resultados
        resultados[nombres.name + " " + nombres.surnames] = level;
    }

    // Devuelve el array de nickname resultante
    return resultados;
}