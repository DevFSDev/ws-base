const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Comprueba si el valor de la query 'id' tiene valor o no
    if (!query["id"]) throw new Error("Parámtros del query vacíos");
    
    // Obtiene el valor de la query 'id'.
    let ID = query["id"];

    // Obtiene de la base de datos la "capability" 
    let consultacrud = await mongo.client.col('Capability').doc(ID)

    // Combrueba que existe el proyecto en la base de datos. En caso de que no exista, devuelve un error.
    if (!consultacrud) throw new Error("El usuario no aparece en la base de datos");

    // Enviamos la información del proyecto en cuestión.
        return consultacrud;
    

}
