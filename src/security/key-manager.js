const jose = require('node-jose');

const cognitoUrl = 'https://cognito-idp.{region}.amazonaws.com/{pool}/.well-known/jwks.json';
const { httpsRequest } = require('./request');

const composeKeyUrl = (pool, region) => {
    return cognitoUrl.replace('{region}', region)
                     .replace('{pool}', pool);
};

const getPublicKeysForConfiguration = async (pool, region) => {
    const keyUrl = composeKeyUrl(pool, region);

    try {
        const response = await httpsRequest(keyUrl);
        var keys = response['keys'];

        return {
            keys: keys
        };
    } 
    catch (error) {
        throw new Error('Error loading public keys', error);
    }
};

const loadKeyDataForKeyId = async (keyId, pool, region) => {
    const keys = await getPublicKeysForConfiguration(pool, region);

    const existing = keys.keys.filter( (key) => {
        if (key.kid === keyId)
            return key;
    } );

    if (existing.length === 0) {
        //no keys found
        return null;
    }

    return existing[0];
};

const parseToken = (token) => {
    try {
        const sections = token.split('.');
        let header = jose.util.base64url.decode(sections[0]);
        header = JSON.parse(header);
        const kid = header.kid;

        return {
            keyId: kid,
            alg: header.alg
        };
    } catch (error) {
        throw new Error('Error parsing token');
    }
};

const verifyCognitoJWTToken = async ({ pool, region, token }) => {    
    const parsedToken = parseToken(token);
    const publicKeyValue = await loadKeyDataForKeyId(parsedToken.keyId, pool, region);

    if (publicKeyValue === null) {
        throw new Error('public key not found');
    }

    const publicKey = await jose.JWK.asKey(publicKeyValue);
    const verification = await jose.JWS.createVerify(publicKey).verify(token);
    const claims = JSON.parse(verification.payload);

    return claims;
};

module.exports = {
    verifyCognitoJWTToken,

    parseToken,
    loadKeyDataForKeyId,
    getPublicKeysForConfiguration,
    composeKeyUrl
};