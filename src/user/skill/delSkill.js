const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    
    // Comprueba si el valor de la query 'nickname' tiene valor o no.
    if (!query["nickname"]) throw new Error("El parámtro nickname es obligatorio");
    if (!query["skill"]) throw new Error("El parámtro skill es obligatorio");

    // Obtiene el valor de la query 'nickname'.
    let nickName = query["nickname"];
    let skill = query["skill"];

    let nickname = nickName.toLowerCase();

    // Obtiene de la base de datos el usuario que tiene el 'nickname' especificado.
    let exists = await mongo.client.col('PersonSkill').findOne({ nickname });

    // Comprueba que existe el usuario en la base de datos. En caso de que no exista, devuelve un error.
    if (!exists) throw new Error("El usuario no aparece en la bdd, no se pudo eliminar");

    // Comprueba que existe la skill en la base de datos. En caso de que no exista, devuelve un error.
    if (!exists.skills[skill]) throw new Error("La skill no aparece en la bdd, no se pudo eliminar");

    // Elimina la skill especificada en el caso de que exista.
    if (exists.skills[skill]) {
        await mongo.client.col('PersonSkill').updateOne({ nickname }, { $unset: { [`skills.${skill}`]: 1 } });
    }

    // En caso de que sí exista, devuelve la info del usuario.
    return exists;
}

