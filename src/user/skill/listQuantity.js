const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si el valor de la query 'team' tiene valor o no
    if (!query["team"]) throw new Error("Parámtros del query vacíos");

    // Obtiene el valor de la query 'team'.
    let Team = query["team"];

    // Obtiene de la base de datos todas las skills de ese team específico.
    let consultacrud1 = await mongo.client.col('Skill').find({ team: Team }).toArray();
    let arraySkills = [];
    for (let i = 0; i < consultacrud1.length; i++) {
        arraySkills.push(consultacrud1[i].skill)
    }

    // Obtiene todas las personas que hay en cada skill.
    let personas = [];
    for (let i = 0; i < arraySkills.length; i++) {
        personas.push(await mongo.client.col('PersonSkill').find({ [`skills.${arraySkills[i]}`]: { $gt: 0 } }).toArray());
    }
    
    // Obtiene el total de personas que hay en cada skill.
    let totalPersonas = [];
    for (let i = 0; i < personas.length; i++) {
        totalPersonas.push(personas[i].length);
    }

    // Crea un objeto vacío para almacenar los resultados
    let resultado = {};

    // Itera sobre el array de skills y agrega cada skill como clave en el objeto resultado
    for (let i = 0; i < arraySkills.length; i++) {
        resultado[arraySkills[i]] = totalPersonas[i];
    }

    // Devuelve el objeto resultado
    return resultado;
}