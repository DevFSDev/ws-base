const bodyParser = require("body-parser");
const express = require("express");

const cluster = require('cluster');
const {response} = require("express");
const e = require("express");

let _onResponse;
let _onError;
let _onRequest;
let _onFallback;
let _onInitialize;
let _onEnd;
let _port = 9000;

let threads = require('os').cpus().length;
let running = 0;

app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function start()
{
    if (cluster.isMaster)
    {
        for (let i = 0; i < threads; i++)
            cluster.fork();

        cluster.on('message', (worker, code, signal) => {
            if (++running === threads) _onInitialize?.(_port);
        });

    } else {

        app.all("*", run(fallback));
        app.listen(_port, () => process.send("OK"));
    }
}

function port(port) 
{
    _port = (port ?? 9000);
}

function get(endpoint, service) {
    if (cluster.isWorker) app.get(endpoint, run(service));
}

function put(endpoint, service) {
    if (cluster.isWorker) app.put(endpoint, run(service));
}

function post(endpoint, service) {
    if (cluster.isWorker) app.post(endpoint, run(service));
}

function del(endpoint, service) {
    if (cluster.isWorker) app.delete(endpoint, run(service));
}

function onInitialize(callback) {
    _onInitialize = callback;
}

function onRequest(callback) { _onRequest = callback; }
function runRequest(request) {
   try { return _onRequest?.(request); } catch(e) { }
}

function onResponse(callback) { _onResponse = callback; }
function runResponse(request, data) {
    try { return _onResponse?.(request, data); } catch(e) { }
}

function onError(callback) { _onError = callback; }
function runError(request, error) {
    try { return _onError?.(request, error); } catch(e) { }
}

function onFallback(callback) { _onFallback = callback; }
function runFallback(request) {
    try { return _onFallback?.(request); } catch(e) { }
}

function onEnd(callback) { _onEnd = callback; }
function runEnd(request, response) {
    try { return _onEnd?.(request, response); } catch(e) { }
}

function run(service) { return async(request, socket) =>
{
    let code, response;

    // Asigna un valor único a la llamada de la API.
    request.id = parseInt(Math.random() * 1000000);
    request.timestamp = new Date();

    let endpoint = request.url.substring(0, request.url.indexOf('?'))
    request.endpoint = !!endpoint ? endpoint : "/";

    try
    {
        // Se notifica que una llamada a API va a ser ejecutada.
        runRequest(request);

        // Se ejecuta la lógica del servicio del API.
        let data = await service(request);

        // Se notifica que la llamada a API ha sido ejecutada correctamente.
        response = runResponse(request, data) ?? data;

        // Se devuelve el dato resultado al servicio.
        code = 200;

    } catch (error) {

        // En caso de error, notifica que la llamada a API ha tenido error.
        response = runError(request, error) ?? error;

        // Se devuelve el dato resultado al servicio.
        code = error.httpCode ?? 500;

    } finally {

        socket.status(code).send(response);
        
        runEnd(request, response);
    }
}}

async function fallback(request, response)
{
    throw ({ ...runFallback(request), httpCode: 404 })
}

module.exports = {
    start, port, get, put, post, del, onRequest, onError, onResponse, onInitialize, onFallback, onEnd
}
