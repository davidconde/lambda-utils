const bodyParser = require('./../body-parser');

test('It handles null and undefined', async () => {
    const res = bodyParser();
    expect(res).toBe(null);
})

test('It handles invalid argument', async () => {
    const res = bodyParser('{this is not valid}');
    expect(res).toBe(null);
});

test('It handles invalid body', async () => {
    const event = {
        body: 'Definitely not a JSON'
    };
    
    const res = bodyParser(event);
    expect(res).toBe(null);
});

test('It handles valid JSON', async () => {
    const event = {
        body: '{"message": "handled"}'
    };

    const res = bodyParser(event);
    
    expect(typeof res).toBe('object');
    expect(res.message).toBe('handled');
});