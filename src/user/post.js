const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Comprueba si el valor del body tiene valor o no.
    if (!query) throw new Error("Parámtros del query están vacíos");

    // Comrpobamos si los campos obligatorios están rellenados.
    if (!query.nickname) throw new Error("El parámetro 'nickname' es obligatorio");
    if (!body.name) throw new Error("El parámetro 'name' es obligatorio");
    if (!body.surnames) throw new Error("El parámtro 'surnames' es obligatorio");
    if (!body.profile) throw new Error("El parámetro 'profile' es obligatorio");


    // Pasamos a minusculas el nickName
    let nickname = query.nickname.toLowerCase();

    // Revisamos si el usuario ya existe en la BBDD.
    let exist = await mongo.client.col('Person').findOne({ nickname });
    if (exist) throw new Error("El usuario ya existe en la BBDD");

    // Insertamos el valor del body a la base de datos.
    await mongo.client.col('Person').insertOne({
        nickname: nickname,
        name: body.name,
        surnames: body.surnames,
        location: body.location,
        profile: body.profile,
        idSAP: body.idSAP,
        numSAP: body.numSAP,
        hireDate: body.hireDate,
        profile: body.profile,
        typeOfContract: body.typeOfContract,
        CV: body.CV,
    });

    // Obtenemos de la base de datos el usuario insertado.
    let consultacrud = await mongo.client.col('Person').findOne({ nickname });

    // Combrueba que existe el usuario en la base de datos. En caso de que no exista, devuelve un error.
    if (!consultacrud) throw new Error("El usuario no aparece en la bdd, no se ha insertado correctamente");

    // En caso de que sí exista, devuelve la info del usuario, en caso contrario devuelve un error.
    return consultacrud;

}