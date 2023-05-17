const mongo = require('nexo-npm-node-mongo');
module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si la query tiene valores vacíos.
    if (!query) throw new Error("Parámtros del query vacíos");

    // Asignamos el departamento a una variable que utilizaremos a continuación.
    let Department = query["department"];

    // Obtiene de la base de datos la información del departamento que el usuario a solicitado.
    let consultacrud = await mongo.client.col('Skill').find({ department: Department }).toArray();

    // Asignamos un array de los "teams" que hay en ese departamento.
    let arrayTeams = [];
    for (let i = 0; i < consultacrud.length; i++) {
        arrayTeams.push(consultacrud[i].team)
    }

    // Utilizamos el constructor Set para crear un nuevo set con elementos únicos, y luego convertimos el set a un array utilizando el operador spread ...
    let uniqueTeams = [...new Set(arrayTeams)];

    // Obtiene una matriz con cada una de las skills de cada team.
    let arraySkills = [];

    for (let i = 0; i < uniqueTeams.length; i++) {
        let consultacrud1 = await mongo.client.col('Skill').find({ team: uniqueTeams[i] }).toArray();
        let skills = [];
        for (let f = 0; f < consultacrud1.length; f++) {
            skills.push(consultacrud1[f].skill)
        }
        arraySkills.push(skills);
    }


    // Obtiene todas las personas que hay en cada "team".
    const equipo = {};

    for (let i = 0; i < arraySkills.length; i++) {
        const skills = arraySkills[i];
        equipo[i] = [];
        for (let j = 0; j < skills.length; j++) {
            const skillResults = await mongo.client.col('PersonSkill').find({ [`skills.${skills[j]}`]: { $gt: 0 } }).toArray();
            skillResults.forEach((result) => {
                if (!equipo[i].find((person) => person.nickname === result.nickname)) {
                    equipo[i].push(result);
                }
            });
        }
    }

    let resultado = [];
    let object = {};

    for (const index in equipo) {
        if (equipo.hasOwnProperty(index)) {
            resultado.push(equipo[index].length);
        }
    }

    // Itera sobre el array de teams y agrega cada skill como clave en el objeto resultado
    for (let i = 0; i < uniqueTeams.length; i++) {
        object[uniqueTeams[i]] = resultado[i];
    }

    return object;
}

