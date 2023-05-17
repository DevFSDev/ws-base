const mongo = require('nexo-npm-node-mongo');

module.exports = async function ({ id, url, query, body, headers }) {

    // Obtenemos de la base de datos los usuarios que tengan el campo skills con contenido.
    let consultacrud = await mongo.client.col('PersonSkill').find({ skills: { $exists: true, $ne: {} } }).toArray();

    // Ordenamos de mayor a menor los que tienen mayor puntuación hasta los que tienen menos.
    consultacrud.sort((a, b) => {
        let aSkillsSum = Object.values(a.skills).reduce((acc, curr) => acc + curr);
        let bSkillsSum = Object.values(b.skills).reduce((acc, curr) => acc + curr);
        
        return bSkillsSum - aSkillsSum;
    });

    return consultacrud;

}