const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si el valor de la query 'nickname' tiene valor o no.
    if (!query["nickname"]) throw new Error("Parámtros del body vacíos");

    // Obtiene el valor de la query 'nickname'.
    let nickName = query["nickname"];

    // Pasamos a minúsculas el nickname.
    let minuscultasNickname = nickName.toLowerCase();

    // Obtiene de la base de datos el usuario que tiene el 'nickname' especificado.
    let exists = await mongo.client.col('Person').findOne({ nickname :  minuscultasNickname });

    // Combrueba que existe el usuario en la base de datos. En caso de que no exista, devuelve un error.
    if (!exists) throw new Error("El usuario no aparece en la bdd, no se pudo eliminar");

    // Eliminamos el usuario en cuestión en el caso de que exista.
    await mongo.client.col('Person').deleteOne({ nickname: minuscultasNickname })

    // En caso de que sí exista, devuelve la info del usuario.
    return exists;
}

