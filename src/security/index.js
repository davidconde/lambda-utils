const { verifyCognitoJWTToken } = require('./key-manager');

/**
 * Decodes a cognito issued jwt token provided a pool and a region
 * 
 * @param {string} token JWT token being validated
 * @param {string} pool Cognito pool where the users are stored
 * @param {string} region AWS Region where the Cognito pool is located. (If not specified it defaults to the env variable AWS_REGION)
 */
const decodeJWTToken = async (token, pool, region) => {
    if (!region) {
        region = process.env.AWS_REGION;
    }

    return verifyCognitoJWTToken(pool, region, token);
};

module.exports = {
    decodeJWTToken
};