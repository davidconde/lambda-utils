const getLogger = require("../logger.js");

const testFunctionName = "TestingLoggerFunction";
const testVersionName = "1.0";
const testRegionName = "eu-west-1";

describe("Logger tests", () => {

  setupVars = () => {
    process.env.AWS_LAMBDA_FUNCTION_NAME = testFunctionName;
    process.env.AWS_LAMBDA_FUNCTION_VERSION = testVersionName;
    process.env.AWS_REGION = testRegionName;
  }

  beforeAll(() => {
    setupVars();
  })

  it("Picks up logger defaults from Lambda variables", () => {
    const logger = getLogger();

    expect(logger.defaultMeta.functionName).toBe(testFunctionName);
    expect(logger.defaultMeta.functionVersion).toBe(testVersionName);
    expect(logger.defaultMeta.region).toBe(testRegionName);
  });
});