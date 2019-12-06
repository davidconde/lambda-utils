const { OK, Error } = require('./../api-responses');

it('CORS headers are not present by default', async () => {
    const jsonResponse = {};
    const result = OK(jsonResponse);
    const errorResult = Error(500, jsonResponse);

    //cors should not be set
    expect(hasCorsHeader(result.headers)).toBe(false);
    expect(hasCorsHeader(errorResult.headers)).toBe(false);
});

it('CORS headers are present with default value when specified', async () => {
    const settings = { cors: true };
    const jsonResponse = {};
    const result = OK(jsonResponse, settings);
    const errorResult = Error(500, jsonResponse, settings);

    //cors should be set
    expect(hasCorsHeader(result.headers)).toBe(true);
    expect(hasCorsHeader(errorResult.headers)).toBe(true);

    //cors should have the right values
    expect(getCorsHeader(result.headers)).toBe("*");
    expect(getCorsHeader(errorResult.headers)).toBe("*");
});

it ('CORS headers are present with supplied value', async () => {
    const settings = { cors: true, corsAllowDomain: "http://www.google.com" };
    const jsonResponse = {};
    const result = OK(jsonResponse, settings);
    const errorResult = Error(500, jsonResponse, settings);

    //cors should be set
    expect(hasCorsHeader(result.headers)).toBe(true);
    expect(hasCorsHeader(errorResult.headers)).toBe(true);

    //cors should have the right values
    expect(getCorsHeader(result.headers)).toBe("http://www.google.com");
    expect(getCorsHeader(errorResult.headers)).toBe("http://www.google.com");
});

const getCorsHeader = (headers) => {
    const filtered = headers.filter(header => typeof header["Access-Control-Allow-Origin"] !== 'undefined');
    return filtered.length > 0 ? filtered[0]["Access-Control-Allow-Origin"] : null;
}

const hasCorsHeader = (headers) => {
    const filtered = headers.filter(header => typeof header["Access-Control-Allow-Origin"] !== 'undefined');
    return filtered.length > 0;
}