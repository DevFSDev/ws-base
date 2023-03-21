const { MongoClient } = require('mongodb');
const extend = require('./extension');

let client;

let url = "";
function setUrl(_url) {
    url = _url;
}

let credentials = "";
function setCredentials(_user, _password) {
    credentials = `${_user}:${_password}@`
}

let schema = "";
function setSchema(_schema) {
    schema = _schema;
}

let onConnected;
function setOnConnected(callback) {
    onConnected = callback;
}

let onFailure;
function setOnFailure(callback) {
    onFailure = callback;
};

function initialize()
{
    if (!url) throw new Error("url not defined");

    let connection = `mongodb://${credentials}${url}/${schema}`
    let client = new MongoClient(connection);
    let initiator = (client) => {
        let db = client.db(schema)
        this.client = extend(db);
        onConnected?.()
    }

    return client.connect()
        .then(initiator, onFailure)
        .catch((error) => { onFailure?.(error); return error; });
}

module.exports = {
    url: setUrl,
    credentials: setCredentials,
    schema: setSchema,
    onConnected: setOnConnected,
    onFailure: setOnFailure,
    initialize,
    client
}
