const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si el valor de la query 'id' tiene valor o no
    if (!query["id"]) throw new Error("Parámtros del query vacíos");
    let ID = query["id"];

    // Obtiene de la base de datos el cargo y los bounds de ese id
    let consultacrud = await mongo.client.col('Experiency').doc(ID);

    // Combrueba que existe el id en la base de datos. En caso de que no exista, devuelve un error.
    if (!consultacrud) throw new Error("El ID no aparece en la base de datos");
    
    // En caso de que sí exista, devuelve la info del usuario.
    return consultacrud;

}
