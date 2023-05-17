const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Comprueba si el valor del body tiene valor o no.
    if (!query) throw new Error("Parámetros del body vacíos");

    // Comrpobamos si los campos obligatorios están rellenados.
    if (!query.nickname) throw new Error("El parámetro 'nickname' es obligatorio");
    if (!query.skill) throw new Error("El parámetro 'skill' es obligatorio");
    if (!query.level) throw new Error("El parámetro 'level' es obligatorio");

    // Pasamos a minusculas el nickName
    let nickname = query.nickname.toLowerCase();

    // Se comprueba si existe el usuario especificado en la colección Person.
    let consultaUsuarioPerson = await mongo.client.col('Person').findOne({ nickname });
    if (!consultaUsuarioPerson) throw new Error("Ese usuario no se encuentra en la colección Person");

    // Se comprueba que la skill que se quiere asociar ya existe en la base de datos
    let skill = query.skill;
    let consultaSkill = await mongo.client.col('Skill').findOne({ skill });
    if (!consultaSkill) throw new Error("Esa skill no aparece en la base de datos");

    // Se comprueba que el nivel de la habilidad cumple las condiciones (int c- [1;4])
    let level = parseInt(query.level);
    if (level === NaN) throw new Error("No has introducido un número");
    if (level < 1 || level > 4) throw new Error("El nivel de skill no esta en el rango correcto (1-4)");

    // Obtiene si ya existe alguna skill asociada al usuario, en caso contrario, inserta (crea) la asociación.
    let asociacion = await mongo.client.col('PersonSkill').findOne({ nickname });
    if (!asociacion) await mongo.client.col('PersonSkill').insertOne({ nickname, skills: {} });

    // Se comprueba que esa skill no está ya asociada al usuario.
    asociacion == await mongo.client.col('PersonSkill').findOne({ nickname });
    if (asociacion.skills[skill]) throw new Error("Esa skill está ya asociada al usuario");

    // Asocia efectivamente la habilidad al usuario con el nivel indicado.
    asociacion.skills[skill] = level;

    let filter = { nickname: { $eq: nickname } };

    const updateDocument = {
        $set: asociacion,
    };

    await mongo.client.col('PersonSkill').updateOne(filter, updateDocument);

    // Devuelve la información de la asociación.
    return asociacion;


}