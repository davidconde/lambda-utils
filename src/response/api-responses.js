const getCorsHeaders = (settings) => {
    const corsEnabled = settings && settings.cors || false;
    const corsDomain = settings && settings.corsAllowDomain || "*";

    if (!corsEnabled)
        return {};

    return {
        "Access-Control-Allow-Origin": corsDomain 
    };
}

const OK = (response, settings = {}) => {
    const respObject = {
        headers: getCorsHeaders(settings),
        statusCode: 200, 
        body: JSON.stringify(response)
    };

    return respObject;
};

const Error = (statusCode, message, settings) => {
    const respObject = {
        headers: getCorsHeaders(settings),
        statusCode: statusCode, 
        body: JSON.stringify({ errorMessage: message })
    };

    return respObject;
};

module.exports = {
    OK,
    Error
};