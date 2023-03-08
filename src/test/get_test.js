module.exports = async function ({ url, query, body, headers }) {

    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        let nombre = query["nombre"]; 

        fetch(`https://api.github.com/users/${nombre}`)
            .then(response => response.json())
            .then(data => console.log(" Tu usuario de gitHub es: " + nombre + "\n Tu nombre es: " + data.name
            + "\n Tu url: " + data.html_url + "\n Fecha de creación del repositorio: " + data.created_at))
            .catch(error => console.error(error));



    } catch (error) { console.log('MyError:', error) }
}