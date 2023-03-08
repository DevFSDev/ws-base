const date = require('./date')
const context = require('./context')

let _onError;
let _onLogged;
let _withFormat;
let _errorFormat;

const INFO = 'I';
const DEBUG = 'D';
const ERROR = 'E';
function e(error)
{
    let ctxt = context.create();
    let err = _errorFormat?.(error) ?? error.message;
    let data = _withFormat?.(ERROR, err, ctxt) ?? defaultOf(ERROR, err);
    console.error(data);

    _onError?.(error, context);
    _onLogged?.(ERROR, data, context);
}

function i(msg)
{
    let ctxt = context.create();
    let data = _withFormat?.(INFO, msg, ctxt) ?? defaultOf(INFO, msg);
    console.info(data);

    _onLogged?.(INFO, data, context);
}

function d(msg)
{
    let ctxt = context.create();
    let data = _withFormat?.(DEBUG, msg, ctxt) ?? defaultOf(DEBUG, msg);
    console.debug(data);

    _onLogged?.(DEBUG, data, context);
}

function withFormat(callback)
{
    _withFormat = callback;
}

function errorFormat(callback)
{
    _errorFormat = callback;
}

function onLogged(callback)
{
    _onLogged = callback;
}

function onError(callback)
{
    _onError = callback;
}

function defaultOf(type, msg)
{
    let color = "";
    switch (type) {
        case ERROR: color = "\x1b[31m" + "ERROR" + "\x1b[0m"; break;
        case INFO: color = "\x1b[33m" + "INFO" + "\x1b[0m"; break;
        case DEBUG: color = "\x1b[35m" + "DEBUG" + "\x1b[0m"; break;
    }

    return `${date.getDate()} ${color} ${context.subStack()} - ${msg}`;
}

module.exports = {
    withFormat, errorFormat, onLogged, onError, i, e, d, types: { INFO, DEBUG, ERROR }
}


