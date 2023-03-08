module.exports = async function ({ url, query, body, headers }) {
    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      let nombre = query["nombre"]; 
  
      const response = await fetch(`https://api.github.com/users/${nombre}`);
      const data = await response.json();
      const responseString = "Tu usuario de GitHub es: " + nombre + "\n Tu nombre es: " + data.name +
        "\n Tu url: " + data.html_url + "\n Fecha de creación del repositorio: " + data.created_at;
        
      return responseString;
  
    } catch (error) { 
      console.log('MyError:', error);
      throw error; // Si hay un error, rechazar la promesa
    }
  }