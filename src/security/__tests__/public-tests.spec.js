const {decodeJWTToken} = require('./../index');

jest.mock('../request');

const testRegion = 'eu-west-1';
const testPool = 'eu-west-1_A12qwe1b';
const testToken = 'eyJraWQiOiJsdHhQakRGNEpiNDlYRmdBNDZNS0RudURJTTdadjNKa1FSQmFuNFhVUU9JPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMTY0NTA4Ni0zNTRiLTRiNzgtODA2MS03NjEyNjQ4MDUxZmEiLCJjb2duaXRvOmdyb3VwcyI6WyJ0aGVyYXBlYV9kZXZfcGF0aWVudCJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfVzUyam9qOWRhIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiZGF2aWQiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo2MzI0MDg3NzQzNzk6cm9sZVwvdGhlcmFwZWFfZGV2X3BhdGllbnQiXSwiYXVkIjoiNzNsa2ViNnM5ZGE4b2l2dWhzbjhncWhpcTUiLCJldmVudF9pZCI6Ijc0OWIxZDIxLTU5MzItMTFlOS1hZDlhLWRkMWQ3MzRjOTE2YyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTU0NjQwODg1LCJwaG9uZV9udW1iZXIiOiIrNDQ3OTIxNTI0MDc5IiwiZXhwIjoxNTU0NjQ0NDg1LCJpYXQiOjE1NTQ2NDA4ODUsImVtYWlsIjoiZGF2aWQuY29uZGUubWFyaW5AZ21haWwuY29tIn0.awPBrUlPkFz52XYc-90UmxzX8ZTHejHmTqOn3ps2tVdcQoqGPUfKbSGc3NVNoBe_D5R_3_PvKCUUDCq3MYj9ohYV-_BHhYlsAF19s6OkLYuDE4PTgZR_gUFnEKKHpP-A1M-X4Zx_eSSkYFaD_Eoc-bZ7okjhOMDDuOqVHR2lGWxu_-_qm1X2YQCiIkEpRa02Z8Cwo7dmK8CR3ID6rW-X2p9gcNJwDwWlgFFhMBOqKzKoEw98LecMmKrQNqdqFo6eugrw7GtlOtVtNNJwqxDTVui-hxbIZj5GI5UEW6264dSfiZNx1ueoaLml5P76Q7FsZarjuhKhjsP1kO2jqiufxg';

test('Can decode key with all specified values', async () => {
    const res = await decodeJWTToken(testToken, testPool, testRegion);

    expect(typeof res).toBe('object');
    expect(res['cognito:username']).toBe('david');
});

test('Can decode key with environment region', async () => {
    process.env.AWS_REGION = 'eu-west-1';

    const res = await decodeJWTToken(testToken, testPool);

    expect(typeof res).toBe('object');
    expect(res['cognito:username']).toBe('david');
});