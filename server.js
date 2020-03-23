'use strict';

// link to .env for environmental variables
require('dotenv').config();

// declare application dependencies
const cors = require('cors');
const express = require('express');

// application setup
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

const client = require('./lib/client');

// turn on the server once the database is connected
client.connect()
.then(() => {
  // console.log('connected to dB');
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});


// my libraries
const locationHandler = require('./lib/locationIq.js');
const weatherHandler = require('./lib/weather.js');
const hikingHandler = require('./lib/trails.js');
const movieHandler = require('./lib/movieHandler.js');
const yelpHandler = require('./lib/yelp.js');


// endpoint calls
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/trails', hikingHandler);
app.get('/movies', movieHandler);
app.get('/yelp', yelpHandler);


app.get('*', (request, response) => {
  response.status(404).send('Sorry, that route does not exist.');
})

