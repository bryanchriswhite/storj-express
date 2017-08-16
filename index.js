const assert = require('assert');
const express = require('express');

const app = express(); 

const storj = function(config) {
  const options = config || {};
  const server = express();

  server.get('/', function(req, res, next) {
    console.log('PINGED `/`')
    return res.status(200).send('PINGED')
  });

  return server;
}

app.use('/storj', storj({
  bridgeHost: 'api.storj.io'
}));

app.listen(4000, () => {
  console.log(`Listening on port 4000`)
});
