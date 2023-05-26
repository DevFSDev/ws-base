const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si el valor de la query 'id_project' tiene valor o no
    if (!query["id_project"]) throw new Error("Parámtros del query vacíos");
    
    // Obtiene el valor de la query 'id_project'.
    let ID = query["id_project"];

    // Obtiene de la base de datos todos el proyecto que tenga ese id de proyecto.
    let consultacrud = await mongo.client.col('Project').doc(ID)
    let consultacrud2 = await mongo.client.col('Person').find().toArray()

    // Combrueba que existe el proyecto en la base de datos. En caso de que no exista, devuelve un error.
    if (!consultacrud) throw new Error("El usuario no aparece en la base de datos");

    // Obtenemos los datos referidos a la persona encargada del proyecto.
    for (let i = 0; i < consultacrud2.length; i++) {
        let consultacrud3 = await mongo.client.col('Person').findOne({_id: consultacrud.idResponsable})
        consultacrud.projectManagerName = consultacrud3.name;
        consultacrud.projectManagerSurnames = consultacrud3.surnames;
        consultacrud.nickname = consultacrud3.nickname;
        consultacrud.email = consultacrud3.email;
        consultacrud.location = consultacrud3.location;
    }

    // Enviamos la información del proyecto en cuestión.
    return consultacrud;
    
    

}
