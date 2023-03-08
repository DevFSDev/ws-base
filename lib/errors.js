/*
const errors = require('nexo-npm-node-errors');

errors.refreshTime(60000);

errors.source(() => {
    let dict = ({
        "1": { code: "1", description: "No se ha especificado ningún dato en el cuerpo de la petición." },
        "2": { code: "2", description: "El valor '${0}' no tiene el formato esperado." },
    });

    errors.bodyCode("1");
    errors.regexCode("2");

    errors.fallback(dict["-1"])
    return dict;
})

errors.fallback({ code: -9, description: "Fallback error not found" })

errors.initialize();
*/