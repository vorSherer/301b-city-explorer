'use strict';

// link to .env for environmental variables
require('dotenv').config();

// declare application dependencies
const cors = require('cors');
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');  // connects to the server that the database is on

// application setup
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);

client.on('error', err => errorHandler(err));

// turn on the server once the database is connected
client.connect()
.then(() => {
  // console.log('connected to dB');
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});


// my libraries
// const locationHandler = require('./lib/location.js');
const weatherHandler = require('./lib/weather.js');
const hikingHandler = require('./lib/trails.js');
const movieHandler = require('./lib/movies.js');
const yelpHandler = require('./lib/yelp.js');




// endpoint calls
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/trails', hikingHandler);
app.get('/movies', movieHandler);
app.get('/yelp', yelpHandler);



function locationHandler(request, response) {
  const city = request.query.city;
  console.log(city);
  let sql = 'SELECT * FROM locations WHERE search_query = $1;';
  let safeValues = [city];
  client.query(sql, safeValues)
  .then(sqlCheck => {
    if(sqlCheck.rows.length > 0) {
      response.status(200).send(sqlCheck.rows[0]);
    } else {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;
      superagent.get(url)
      .then(results => {
        const location = new Location(results.body[0], city)
        sql = 'INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1, $2, $3, $4);';
        safeValues = [location.search_query, location.search_query, location.latitude, location.longitude];
        client.query(sql,safeValues);
        response.status(200).send(location);
      }).catch(err => errorHandler(err, response));
    }
  })
};

// app.get('/location', (request, response) => {
//     const city = request.query.city;
//     let sql = 'SELECT * FROM locations WHERE search_query = $1;';
//     let safeValues = [city];
//     client.query(sql, safeValues)
//     .then(sqlCheck => {
//       if(sqlCheck.rows.length > 0) {
//         response.status(200).send(sqlCheck.rows[0]);
//       } else {
//         const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;
//         superagent.get(url)
//         .then(results => {
//           const location = new Location(results.body[0], city)
//           sql = 'INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1, $2, $3, $4);';
//           safeValues = [location.search_query, location.search_query, location.latitude, location.longitude];
//           client.query(sql,safeValues);
//           response.status(200).send(location);
//         }).catch(err => errorHandler(err, response));
//       }
//     })
// });

function Location(obj, city) {
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}


function errorHandler (err, response) {
  console.error(err);
  if(response) {
    response.status(500).send('Sorry, I can\'t help with that.');
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Sorry, that route does not exist.');
})

