
/**
 * Parses the body of the event a lambda receives. Assumes the body has been posted as part of the body property.
 * 
 * @param {Object} event Event object received by the lambda
 * @returns {Object} Parsed object from the body property
*/

const bodyParser = (event) => {
    if (!event || !event.body) {
        return null;
    }

    const requestBody = event.body;

    if (!requestBody) {
      return null;
    }
  
    try{
      return JSON.parse(requestBody);
    }
    catch(ex) {
      return null;
    }
};

module.exports = bodyParser;