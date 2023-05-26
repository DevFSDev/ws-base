const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Comprueba si el valor de la query 'id_project' tiene valor o no
    if (!query["id_project"]) throw new Error("Parámtros del query vacíos");
    
    // Obtiene el valor de la query 'id_project'.
    let ID = query["id_project"];

    // Obtiene de la base de datos las capabilitys que tienen ese 'id_project' especificado
    let consultacrud = await mongo.client.col('Capability').find({idProject: ID}).toArray();
    for (let i = 0; i < consultacrud.length; i++) {
        // Obtiene la skill mediante el idSKill
        let consultacrud2 = await mongo.client.col('Skill').doc(consultacrud[i].idSkill)
        consultacrud[i].skill = consultacrud2.skill;

    }

    // Combrueba que existe el "id_project" en la base de datos. En caso de que no exista, devuelve un error.
    if (!consultacrud) throw new Error("El proyecto no aparece en la base de datos");

    // Enviamos un array en el caso de que tenga capabilitys o no.
    return consultacrud;
    
    

}
