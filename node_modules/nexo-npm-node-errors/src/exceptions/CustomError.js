
class CustomError extends Error {

    constructor(error)
    {
        super();
        for (const prop in error) this[prop] = error[prop];
    }

}

/*
function CustomException(error){
    this.error = error;
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, CustomException);
    else
        this.stack = (new Error()).stack;
}

CustomException.prototype = { ...Object.create(Error.prototype), ...this.error }
CustomException.prototype.name = 'CustomException'
CustomException.prototype.stack = this.stack;
*/

module.exports = {
    CustomError: CustomError,
};
