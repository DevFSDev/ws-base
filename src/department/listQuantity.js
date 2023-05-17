const mongo = require('nexo-npm-node-mongo');
module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si recibimos valores por el body.
    if (!body) throw new Error("Parámtros del body vacíos");
    let Department = body;
    let arrayTotalPersonas = [];

    for (let o = 0; o < Department.length; o++) {
        // Obtiene de la base de datos todos los teams de ese departamento específico.
        let consultacrud = await mongo.client.col('Skill').find({ department: Department[o].name }).toArray();

        let arrayTeams = [];
        for (let i = 0; i < consultacrud.length; i++) {
            arrayTeams.push(consultacrud[i].team)
        }

        // Utilizamos el constructor Set para crear un nuevo set con elementos únicos, y luego convertimos el set a un array utilizando el operador spread
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


        // Obtiene todas las personas que hay en cada skill.
        let personas = [];
        let numeroEquipos = [];
        let nicknames = {};

        for (let i = 0; i < arraySkills.length; i++) {
            numeroEquipos.push(arraySkills[i].length)
            for (let f = 0; f < arraySkills[i].length; f++) {
                let results = await mongo.client.col('PersonSkill').find({ [`skills.${arraySkills[i][f]}`]: { $gt: 0 } }).toArray();
                // Recorremos los resultados y añadimos las personas no repetidas al array personas
                for (let j = 0; j < results.length; j++) {
                    let nickname = results[j].nickname;
                    if (!nicknames[nickname]) {
                        personas.push(results[j]);
                        nicknames[nickname] = true;
                    }
                }
            }
        }

        // Obtenemos el número de personas que hay en cada skill.
        let numeroPersonas = []
        for (let i = 0; i < personas.length; i++) {
            numeroPersonas.push(personas[i].length)
        }

        let totalPersonas = 0;
        for (let i = 0; i < numeroPersonas.length; i++) {
            totalPersonas++;

        }

        arrayTotalPersonas.push(totalPersonas)
    }

    let object = {};

    // Itera sobre el array de skills y agrega cada skill como clave en el objeto resultado
    for (let i = 0; i < Department.length; i++) {
        object[Department[i].name] = arrayTotalPersonas[i]
    }

    // Devolvemos la cantidad de personas que hay en cada departamento sin repetir.
    return object;
}