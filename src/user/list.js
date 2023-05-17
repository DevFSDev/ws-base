const mongo = require('nexo-npm-node-mongo');
const moment = require('moment');

module.exports = async function ({ id, url, query, body, headers }) {
    
    let consulta = {};
    let consultacrud = {};

    // Se puede listar por nickname, hireDate, idSAP, location, name, numSAP, profile, surnames y typeOfContract.
    if (query["nickname"] || query["hireDate"] || query["idSAP"] || query["location"] ||
        query["name"] || query["numSAP"] || query["profile"] || query["surnames"] || query["typeOfContract"]) {
        if (query.numSAP && isNaN(query.numSAP)) throw new Error("El valor de numSAP debe ser un número");   
        if (query.idSAP && isNaN(query.idSAP)) throw new Error("El valor de idSAP debe ser un número");  
        if (query.hireDate && !moment(query.hireDate, 'DD/MM/YY', true).isValid()) throw new Error('La fecha introducida no es válida o no tiene un formato correcto: DD/MM/YY');
        if (query.location && !/^[a-zA-Z-ñÑ\s]*$/.test(query.location)) throw new Error("La localización no debe contener números ni caracteres especiales");
        if (query.name && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(query.name)) throw new Error("El nombre no debe contener números ni caracteres especiales");
        if (query.surnames && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(query.surnames)) throw new Error("Los apellidos no debe contener números ni caracteres especiales");
        if (query.location) query.location = query.location.toUpperCase();
        if (query.typeOfContract && (query.typeOfContract !== "Interno" && query.typeOfContract !== "Becario" ))throw new Error("El tipo de contrato debe ser Interno o Becario");

        let key = Object.keys(query);
        let value = Object.values(query);
            

        for (let i = 0; i < key.length; i++) {
            consulta[key[i]] = value[i];
            consultacrud = await mongo.client.col('Person').find(consulta).toArray();
        }
    }

    // En caso de que sí exista, devuelve la info del usuario.
    return consultacrud;

}