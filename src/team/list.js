const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    
    // Comprueba si el valor de la query 'department' tiene valor o no
    if (!query["department"]) throw new Error("Parámtros del query vacíos");

    // Asignamos department a una variable para usarla a continuación.
    let Department = query["department"];

    // Obtiene de la base de datos los "teams" que tiene el departamento solicitado.
    let consultacrud = await mongo.client.col('Team').find({ department: Department }).toArray();

    // Obtenemos un array de todos teams que hay en el departamento.
    let arrayTeams = [];
    for (let i = 0; i < consultacrud.length; i++) {
        arrayTeams.push(consultacrud[i].team)
    }

    // En caso de que sí exista, devuelve la info del usuario.
    return arrayTeams;

}