const { OK, Error } = require('./../api-responses');

test('It responds with 200 using OK', async () => {
    const jsonResponse = {message: 'OK-message'};

    const result = OK(jsonResponse);
    const parsedResult = JSON.parse(result.body);

    expect(typeof result).toBe('object');
    expect(result.statusCode).toBe(200);
    expect(parsedResult.message).toBe('OK-message');
});

test('It responds with error code and message using string Error', async () => {
    const jsonResponse = 'Error-message';

    const result = Error(500, jsonResponse);
    const parsedResult = JSON.parse(result.body);

    expect(typeof result).toBe('object');
    expect(result.statusCode).toBe(500);
    expect(parsedResult.errorMessage).toBe('Error-message');
})