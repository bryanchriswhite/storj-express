const assert = require('assert');
const express = require('express');

const app = express(); 

const storj = function(config) {
  const bridgeHost = config.bridgeHost || 'https://api.storj.io';
  const server = express();
  const controllers = require('./src');

  // get bridge info 
  server.get('/', controllers.getInfo);

  // create bucket 
  server.post('/buckets', controllers.createBucket);

  // add file to bucket 
  server.post('/buckets/:id', controllers.upload); 

  // download a file from bucket
  server.get('/buckets/:id/:file', controllers.download); 

  // delete file from bucket
  server.delete('/buckets/:id', controllers.deleteFile); 

  // register a user 
  server.post('/users', controllers.createUser); 

  // update user preferences 
  server.put('/users/:id', controllers.updateUser); 

  return server;
}

app.use('/storj', storj({
  bridgeHost: 'api.storj.io',
  user: process.env.STORJ_USER || '',
  pass: process.env.STORJ_PASS || '',
  key: process.env.STORJ_MNEMONIC || ''
}));

app.listen(4000, () => {
  console.log(`Listening on port 4000`)
});
