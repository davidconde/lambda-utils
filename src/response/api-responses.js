const OK = (response) => {
    const respObject = {
        statusCode: 200, 
        body: JSON.stringify(response)
    };

    return respObject;
};

const Error = (statusCode, message) => {
    const respObject = {
        statusCode: statusCode, 
        body: JSON.stringify({ errorMessage: message })
    };

    return respObject;
};

module.exports = {
    OK,
    Error
};