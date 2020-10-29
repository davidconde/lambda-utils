const winston = require("winston");

var _instance = null;

const createContext = () => {
  const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME || "";
  const functionVersion = process.env.AWS_LAMBDA_FUNCTION_VERSION || "$LATEST";
  const functionRegion = process.env.AWS_REGION || "eu-west-1";

  return {
    functionName: functionName,
    functionVersion: functionVersion,
    region: functionRegion
  };
}

const configure = () => {
  const appLogLevel = process.env.APP_LOG_LEVEL || "error";

  const context = createContext();

  _instance = winston.createLogger({
    level: appLogLevel,
    defaultMeta: {
      functionName: context.functionName,
      functionVersion: context.functionVersion,
      region: context.region
    },
    transports: [
      new winston.transports.Console()
    ]
  });
}

const getLogger = () => {
  if (_instance === null) {
    configure();
  }

  return _instance;
}


module.exports = getLogger;