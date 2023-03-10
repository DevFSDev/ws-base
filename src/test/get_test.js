module.exports = async function ({ id, url, query, body, headers }) {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let posicion = parseInt(query["index"]);
    //10.228.58.72:9000/user  

    const response = await fetch(`https://rickandmortyapi.com/api/character`);
    const data = await response.json();
    let responseJson = "";
    console.log("Posicion recibida por el emulador: " + posicion)

      responseJson =

      {
        "Nombre": data.results[posicion].name,
        "Especie": data.results[posicion].species,
        "Estado": data.results[posicion].status,
        "Avatar": data.results[posicion].image,
      }
    

    console.log("Respues enviada al emulador: " + responseJson)
    return (responseJson)

  } catch (error) {
    console.log('MyError:', error);
    throw error; // Si hay un error, rechazar la promesa
  }
}