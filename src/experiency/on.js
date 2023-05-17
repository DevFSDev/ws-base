const { response } = require('express');
const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {
    // Asignamos el valor x y el valor y a constantes. 
    const x = query["x"];
    const y = query["y"];

    // Comprobamos que los valores son introducidos.
    if (!x) throw new Error("Parámetro x es obligatorio");
    if (!y) throw new Error("Parámetro y es obligatorio");

    // Comprobamos que los valores no estén fuera de rango establecido.
    if (x > 1 || x < -1) throw new Error("Valor eje X fuera de rango");
    if (y > 1 || y < -1) throw new Error("Valor eje Y fuera de rango");

    // Buscamos todas las experiencias en la base de datos.
    const experiencias = await mongo.client.col('Experiency').find().toArray();

    // Buscamos aquella experiencia que esté dentro del rango X e Y establecido por el usuario.
    let resultado;
    for (let experiencia of experiencias) {
        const bounds = Object.values(experiencia.bounds);
        const [minY, maxY, minX, maxX] = bounds;

        // Devolvemos la experiencia encontrada.
        if (y >= minY && y <= maxY && x >= minX && x <= maxX){
            console.log(experiencia)
        }

    }

    return resultado;
}