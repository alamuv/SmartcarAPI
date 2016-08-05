const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/serverConfig');
const vehiclesRouter = require('./routers/vehicles');

const app = express();

app.use(bodyParser.json());
app.use('/vehicles', vehiclesRouter);

app.listen(config.port, () => {
  console.log('Listening on port ', config.port);
});

module.exports = app;
