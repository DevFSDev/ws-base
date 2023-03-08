module.exports = async function ({ url, query, body, headers }) {
    try {
        let num1 = Number(query["num1"]); 
        let num2 = Number(query["num2"]);
        
        return `El resultado es ${num1 + num2}`
    } catch (error) { console.log('MyError:', error) }
}