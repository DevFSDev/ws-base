function NotFoundError(code){
    this.message = "Error with code " + code + " doesn't exist";
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, NotFoundError);
    else
        this.stack = (new Error()).stack;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.name = "ErrorNotFoundException";
NotFoundError.prototype.message = this.message;
NotFoundError.prototype.stack = this.stack;

module.exports = {
    ErrorNotFoundException: NotFoundError,
};
