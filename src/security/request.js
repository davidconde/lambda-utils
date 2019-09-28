const https = require('https');

const internalHttpsRequest = (url, resolve, reject) => {
    let request = https.get(url, (response) => {
        if (response.statusCode == 200) {   
            response.on('data', data => {
                resolve(JSON.parse(data))
            })
        } else {
          reject('Error on http call')  
        }
    });

    request.on('error', error => {
        reject(error);
    }) 
};

const httpsRequest = (url) => {
    return new Promise( (resolve, reject) => {
        internalHttpsRequest(url, resolve, reject);
    })
}; 

module.exports = {
    httpsRequest
};