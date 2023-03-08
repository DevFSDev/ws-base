function RuntimeError(message){
    this.message = message;
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, RuntimeError);
    else
        this.stack = (new Error()).stack;
}

RuntimeError.prototype = Object.create(Error.prototype);
RuntimeError.prototype.name = "RuntimeException";
RuntimeError.prototype.message = this.message;
RuntimeError.prototype.stack = this.stack;

module.exports = {
    RuntimeException: RuntimeError,
};
