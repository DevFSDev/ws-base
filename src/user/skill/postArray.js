const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    console.log("test")
    // Comprueba si el valor del body tiene valor o no.
    if (!body) throw new Error("Parámetros del body vacíos");

    let skills = body.skillArray;
    let values = body.levelArray;

    console.log(skills)
    console.log(values)

    // Comrpobamos si los campos obligatorios están rellenados.
    if (!query.nickname) throw new Error("El parámetro 'nickname' es obligatorio");
    if (!body.skillArray) throw new Error("El parámetro 'skillArray' es obligatorio");
    if (!body.levelArray) throw new Error("El parámetro 'levelArray' es obligatorio");

    // Pasamos a minusculas el nickName
    let nickname = query.nickname.toLowerCase();

    // Se comprueba si existe el usuario especificado en la colección Person.
    let consultaUsuarioPerson = await mongo.client.col('Person').findOne({ nickname });
    if (!consultaUsuarioPerson) throw new Error("Ese usuario no se encuentra en la colección Person");

    // Se comprueba que la skill que se quiere asociar ya existe en la base de datos
    for (let i = 0; i < skills.length; i++) {
        let skill = (skills[i].name);
        let consultaSkill = await mongo.client.col('Skill').findOne({ skill });
        if (!consultaSkill) throw new Error("Esa skill no aparece en la base de datos");
    }

    // Se comprueba que el nivel de la habilidad cumple las condiciones (int c- [1;4])
    for (let i = 0; i < values.length; i++) {
        let level = parseInt(values[i].value);
        if (level === NaN) throw new Error("No has introducido un número");
        if (level < 1 || level > 4) throw new Error("El nivel de skill no esta en el rango correcto (1-4)");
    }

    // Obtiene si ya existe alguna skill asociada al usuario, en caso contrario, inserta (crea) la asociación.
    let asociacion = await mongo.client.col('PersonSkill').findOne({ nickname });
    if (!asociacion) await mongo.client.col('PersonSkill').insertOne({ nickname, skills: {} });

    // Se comprueba que esa skill no está ya asociada al usuario.
    asociacion == await mongo.client.col('PersonSkill').findOne({ nickname });
    
    for (let i = 0; i < skills.length; i++) {
        // Asocia efectivamente la habilidad al usuario con el nivel indicado.
        asociacion.skills[skills[i].name] = parseInt(values[i].value);
    }

    let filter = { nickname: { $eq: nickname } };

    const updateDocument = {
        $set: asociacion,
    };

    await mongo.client.col('PersonSkill').updateOne(filter, updateDocument);

    // Devuelve la información de la asociación.
    return asociacion;


}