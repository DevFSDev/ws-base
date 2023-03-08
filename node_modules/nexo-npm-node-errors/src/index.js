const { Source } = require('./source')
const { ErrorNotFoundException } = require("./exceptions/NotFoundError");
const { CustomError } = require("./exceptions/CustomError");

let _source;
let _refreshTime;
let _onRefresh;
let _onExcept;
let _fallback;
let _queryCode;
let _bodyCode;
let _headerCode;
let _typeCode;
let _nullCode;
let _regexCode;
let _dateCode;

let errors = {};

function initialize()
{
    let refresh = async () => {
        errors = (await _source?.()) ?? {}
        _onRefresh?.(errors);
    }

    if (_refreshTime) setInterval(refresh, _refreshTime);
    refresh();
}

function source(source) {
    _source = source
}

function fallback(error) {
    _fallback = error;
}

function refreshTime(time) {
    _refreshTime = time;
}

function onExcept(callback) {
    _onExcept = callback;
}

function onRefresh(callback) {
    _onRefresh = callback;
}

function format(error, ...params)
{
    let result = Object.assign({}, error);
    for (const p in params)
        result.description = result.description?.replace(`\${${p}}`, params[p])
    return result;
}

function get(code, ...params)
{
    return format(errors[code] ?? _fallback ?? {}, ...params);
}

function except(code, ...params)
{
    let error = get(code, ...params)
    _onExcept?.(error)
    throw error;
}

function queryCode(code) { _queryCode = code }
function exceptQuery(key, query) {
    if (!query[key]) except(_queryCode, key)
    return query[key];
}

function bodyCode(code) { _bodyCode = code }
function exceptBody(body) {
    if (!body) except(_bodyCode)
    return body;
}

function headerCode(code) { _headerCode = code }
function exceptHeader(key, headers) {
    if (!headers[key]) except(_headerCode, key)
    return headers[key];
}

function typeCode(code) { _typeCode = code }
function exceptType(key, value, type, assertion) {
    try { if (!assertion(value)) throw Error() }
    catch { except(_typeCode, key, type) }
    return value;
}

function nullCode(code) { _nullCode = code }
function exceptNull(object, type, key, value) {
    if (!object) except(_nullCode, type, key, value)
    return object;
}

function regexCode(code) { _regexCode = code }
function exceptRegex(key, value, regex) {
    if (!new RegExp(regex).test(value)) except(_regexCode, key)
    return value;
}

function dateCode(code) { _dateCode = code }
function exceptDate(key, value, format) {
    except(_dateCode, key, format)
}

module.exports = {
    initialize,
    source,
    get,
    fallback,
    refreshTime,
    onExcept,
    onRefresh,
    format,
    except,
    queryCode,
    exceptQuery,
    bodyCode,
    exceptBody,
    headerCode,
    exceptHeader,
    typeCode,
    exceptType,
    nullCode,
    exceptNull,
    regexCode,
    exceptRegex,
    dateCode,
    exceptDate
};

