// eslint-disable-next-line import/no-extraneous-dependencies
const ParseServer = require('parse-server').ParseServer;
import path from 'path';

const server = new ParseServer({
  databaseURI: DATABASE_URL || 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: path.resolve(__dirname, './main.ts'), // Path to your Cloud Code
  allowClientClassCreation: true,
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
});

// Start server
server.start();

// Serve the Parse API on the /parse URL prefix
export default server.app;
