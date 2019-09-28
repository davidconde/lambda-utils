
const keyManager = require('../key-manager');
jest.mock('../request');

const testRegion = 'eu-west-1';
const testPool = 'eu-west-1_A12qwe1b';
const testKeyId = 'ltxPjDF4Jb49XFgA46MKDnuDIM7Zv3JkQRBan4XUQOI=';
const testToken = 'eyJraWQiOiJsdHhQakRGNEpiNDlYRmdBNDZNS0RudURJTTdadjNKa1FSQmFuNFhVUU9JPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMTY0NTA4Ni0zNTRiLTRiNzgtODA2MS03NjEyNjQ4MDUxZmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ0aGVyYXBlYV9kZXZfcGF0aWVudCJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfVzUyam9qOWRhIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiZGF2aWQiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo2MzI0MDg3NzQzNzk6cm9sZVwvdGhlcmFwZWFfZGV2X3BhdGllbnQiXSwiYXVkIjoiNzNsa2ViNnM5ZGE4b2l2dWhzbjhncWhpcTUiLCJldmVudF9pZCI6Ijc0OWIxZDIxLTU5MzItMTFlOS1hZDlhLWRkMWQ3MzRjOTE2YyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU0NjQwODg1LCJwaG9uZV9udW1iZXIiOiIrNDQ3OTIxNTI0MDc5IiwiZXhwIjoxNTU0NjQ0NDg1LCJpYXQiOjE1NTQ2NDA4ODUsImVtYWlsIjoiZGF2aWQuY29uZGUubWFyaW5AZ21haWwuY29tIn0.awPBrUlPkFz52XYc-90UmxzX8ZTHejHmTqOn3ps2tVdcQoqGPUfKbSGc3NVNoBe_D5R_3_PvKCUUDCq3MYj9ohYV-_BHhYlsAF19s6OkLYuDE4PTgZR_gUFnEKKHpP-A1M-X4Zx_eSSkYFaD_Eoc-bZ7okjhOMDDuOqVHR2lGWxu_-_qm1X2YQCiIkEpRa02Z8Cwo7dmK8CR3ID6rW-X2p9gcNJwDwWlgFFhMBOqKzKoEw98LecMmKrQNqdqFo6eugrw7GtlOtVtNNJwqxDTVui-hxbIZj5GI5UEW6264dSfiZNx1ueoaLml5P76Q7FsZarjuhKhjsP1kO2jqiufxg';

const badTestToken = 'NOT_A_REAL_TOKEN';
const badTestKeyId = 'FAKE_KEY';

test('Function exists', () => {
    expect(typeof keyManager.getPublicKeysForConfiguration).toBe('function');
});

test('Can compose keys url', async () => {
    const res = keyManager.composeKeyUrl(testPool, testRegion);

    expect(typeof res).toBe('string');
    expect(res).toBe('https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_A12qwe1b/.well-known/jwks.json');
});

test('Can get public keys', async () => {
    const res = await keyManager.getPublicKeysForConfiguration(testPool, testRegion);

    expect(typeof res).toBe('object');
    expect(typeof res.keys).toBe('object');
    expect(res.keys.length).toBe(2);
});

test('Can parse token', async () => {
    const res = await keyManager.parseToken(testToken);

    expect(typeof res).toBe('object');
    expect(res.keyId).toBe('ltxPjDF4Jb49XFgA46MKDnuDIM7Zv3JkQRBan4XUQOI=');
    expect(res.alg).toBe('RS256');
});

test('Throws error on invalid token', async () => {
    expect(() => {
        keyManager.parseToken(badTestToken)
    }).toThrow();
});

test('Can load specified keyID', async () => {
    const res = await keyManager.loadKeyDataForKeyId(testKeyId, testPool, testRegion);

    expect(typeof res).toBe('object');
    expect(res.kid).toBe(testKeyId);
});

test('Returns null when specified key doesnt exist', async () => {
    const res = await keyManager.loadKeyDataForKeyId(badTestKeyId, testPool, testRegion);
    expect(res).toBe(null);
});

test('Can verify a token', async () => {
    const res = await keyManager.verifyCognitoJWTToken(testPool, testRegion, testToken);
    expect(typeof res).toBe('object');
    expect(res['cognito:username']).toBe('david');
});
