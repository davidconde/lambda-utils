const { verifyCognitoJWTToken } = require('./key-manager');

const decodeJWTToken = async (params) => {
    return verifyCognitoJWTToken(params);
};

module.exports = {
    decodeJWTToken
};