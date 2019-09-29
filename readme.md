# AWS Lambda utils

Over the space of some time I've built quite a few lambdas for more or less complex applications. I've been extracting some of that into a package and will be using it on my own projects this way so I can share it with others.


## Responses

There's two fundamental responses a Lambda will always send, things either went well or not. In the case they go well, you always want a 200 response. If it doesn't go as well then there's some different options. 

### Returning OK for an operation

```
const { ResponseUtil } = require('dcm-lambda-utils');

module.exports.doNothing = async (event, context) => {
    return ResponseUtil.OK({message: 'This doesnt do much!'});
}

```

### Returning an Error for an operation

```
const { ResponseUtil } = require('dcm-lambda-utils');

module.exports.doNothing = async (event, context) => {
    return ResponseUtil.Error(401, 'I know this doesnt do much, but you dont even get that ;)');
}

```

## Parsing requests

Parsing a request is pretty simple:

```
const { ResponseUtil, BodyParser } = require('dcm-lambda-utils');

module.exports.doNothing = async (event, context) => {
    const parsedBody = BodyParser(event);

    if (parsedBody === null) {
        return ResponseUtil.Error(400, 'Could not parse the body of the request');
    }
    
    return ResponseUtil.OK({message: 'Parsed!', body: parsedBody});
}

```

## Decoding JWT Tokens with Cognito

To check a jwt token issued by Cognito, you will need to know which Cognito pool your application is using and on which region is hosted. Once you have that you can check and decode the object very simply:


```
const { Security, ResponseUtil, BodyParser } = require('dcm-lambda-utils');

module.exports.doNothing = async (event, context) => {

    //First make sure you can get the token
    const parsedBody = BodyParser(event);

    if (parsedBody === null) {
        return ResponseUtil.Error(400, 'Could not parse the body of the request');
    }

    try {
        let validatedUser = await Security.decodeJWTToken(parsedBody.token, process.env.cognitoPoolId, process.env.AWS_REGION);

        if (validatedUser === null) {
            return ResponseUtil.Error(400, 'Could not validate your token');
        }

        const userName = validatedUser.username;

        if (userName === null) 
            userName = validatedUser['cognito:username'];
        
        return validatedUser.username;

    } catch(error) {
        console.log(error.Message)
        return null;
    }
    
    return ResponseUtil.OK({message: 'Parsed!', body: parsedBody});
}

```