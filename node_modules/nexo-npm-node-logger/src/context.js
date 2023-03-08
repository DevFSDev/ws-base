function subStack()
{
    let stack = new Error().stack;
    if(stack) {
        let parenthesis = stack.indexOf("at ");
        let substring;
        stack = stack.substring(parenthesis+1);
        while (parenthesis!==-1) {
            parenthesis = stack.indexOf("at ");
            substring = stack.substring(0,parenthesis+1);
            if(substring.indexOf("node_modules")!==-1) {
                stack = stack.substring(parenthesis+1);

            }
            else {substring = substring.substring(0, substring.indexOf('\n')); break;}
        }

        let bar=-1;
        for(let i = 0; i<substring.length; i++)
        {
            if(substring.indexOf('\\',i)!==-1)
                bar=substring.indexOf('\\',i)
        }
        return substring.substring(bar + 1);        
    }
    return stack
}

function getFileName()
{
    let substack = subStack();
    let twoPoints = substack.indexOf(':');
    let fileName = substack.substring(0,twoPoints);
    return fileName;
}

function getLine()
{
    let substack = subStack();
    let twoPoints = substack.indexOf(':');
    let lineColumn = substack.substring(twoPoints+1);
    twoPoints = lineColumn.indexOf(':');
    let line = lineColumn.substring(0,twoPoints);
    return line;
}

function getColumn()
{
    let substack = subStack();
    let twoPoints = substack.indexOf(':');
    let lineColumn = substack.substring(twoPoints+1);
    twoPoints = lineColumn.indexOf(':');
    let column = lineColumn.substring(twoPoints+1);
    return column;
}

function getTimestamp()
{
    return new Date();
}

function getContext()
{
    let context = {
        filename:getFileName(),
        line:getLine(),
        column:getColumn(),
        timestamp:getTimestamp(),
    };
    return context;
}

module.exports = {
    subStack, create: getContext
}
