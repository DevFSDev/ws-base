const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si el valor de la query 'skill' tiene valor o no.
    if (!query["skill"]) throw new Error("Parámtros del query vacíos");

    // Obtiene el valor de la query 'skill'.
    let habilidad = query["skill"];
    let consultacrud = "";

    // Obtiene de la base de datos el usuario que tiene el 'skill' especificada.
    consultacrud = await mongo.client.col('Skill').findOne({skill: habilidad});

    // Combrueba que existe la skill en la base de datos. En caso de que no exista, devuelve un error.
    if (!consultacrud) throw new Error("La skill no aparece en la base de datos, no se ha eliminado correctamente");

    //Eliminamos la skill en cuestión en el caso de que exista.
    await mongo.client.col('Skill').deleteOne({ skill: habilidad })

   // En caso de que sí exista, devuelve la info del usuario, en caso contrario devuelve 500 error.
    return consultacrud;
}

