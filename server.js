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

client.on('error', err => errorHandler(err, response));


// turn on the server once the database is connected
client.connect()
.then(() => {
  // console.log('connected to dB');
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});



// my libraries
// const handleLocation = require('./lib/handleLocation');



// endpoint calls
app.get('/location', (request, response) => {
    const city = request.query.city;
    let sql = 'SELECT * FROM locations WHERE search_query = $1;';
    let safeValues = [city];
    client.query(sql, safeValues)
    .then(sqlCheck => {
      if(sqlCheck.rows.length > 0) {
        console.log('dB says I\'ve got that already');
        response.status(200).send(sqlCheck.rows[0]);
      } else {
        const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;
        superagent.get(url)
        .then(results => {
          // console.log(results);
          const location = new Location(results.body[0], city)
          sql = 'INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1, $2, $3, $4);';
          safeValues = [location.search_query, location.search_query, location.latitude, location.longitude];
          console.log('Now inserting these values into DB');
          console.log(sql,safeValues);
          client.query(sql,safeValues);
          response.status(200).send(location);
        }).catch(err => errorHandler(err, response));
      }
    })
});






app.get('/weather', (request, response) => {
  // //     // let city = request.query.search_query;
  // //     // let formatted_query = request.query.formatted_query;
  let latitude = request.query.latitude;
  let longitude = request.query.longitude;
  let url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;
  superagent.get(url)
  .then(results => {
    let weatherArray = results.body.daily.data;
    let forecastArray = weatherArray.map(day => new Weather(day));
    response.status(200).send(forecastArray);
  }).catch(err => errorHandler(err, response));
});

// app.get('/trails', (request, response) => {
//   let latitude = request.query;
//   let longitude = request.query;
//   let url = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${process.env.HIKING_API_KEY}`;
//   superagent.get(url)
//   .then(results => {
//     let hikesObj = results.body.trails.map(trail => new Hiking(trail));
//     response.status(200).send(hikesObj);
//   }).catch(err => errorHandler(err, response));
// });


app.get('/movies', (request, response) => {

})

// **************************************************************************


// Original code *****************************************************
// app.get('/weather', (request, response) => {
//   // //     // let city = request.query.search_query;
//   // //     // let formatted_query = request.query.formatted_query;
//   let latitude = request.query.latitude;
//   let longitude = request.query.longitude;
//   let url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;
//   superagent.get(url)
//   .then(results => {
//     let weatherArray = results.body.daily.data;
//     let forecastArray = weatherArray.map(day => new Weather(day));
//     response.status(200).send(forecastArray);
// }).catch(err => errorHandler(err, response));
// }); 



// **************


// Constructor functions
function Location(obj, city) {
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Weather(obj) {
  this.time = new Date(obj.time * 1000).toDateString();
  this.forecast = obj.summary;
}

// function Hiking(obj) {
//   this.name = obj.name;
//   this.location = obj.location;
//   this.length  = obj.length;
//   this.stars = obj.stars;
//   this.star_votes = obj.starVotes;
//   this.summary = obj.summary;
//   this.trail_url = obj.url;
//   this.conditions = obj.conditionStatus;
//   this.condition_date = obj.conditionDate.slice(0,10);
//   this.condition_time = obj.conditionTime.slice(11,19);
// }

// function Movies (obj) {
//   this.title = obj.title;
//   this.overview = obj.overview;
//   this.average_votes = obj.avgVotes;
//   this.total_votes = obj.ttlVotes;
//   this.image_url = obj.imageUrl;
//   this.popularity = obj.popularity;
//   this.released_on = obj.released;
//   }
  

// ***************

function errorHandler (err, response) {
  console.error(err);
  if(response) {
    response.status(500).send('Sorry, I can\'t help with that.');
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Sorry, that route does not exist.');
})



// app.get('/', (req,res) => {
//     res.status(200).send('Hello!')
// });

// app.get('/location', (req, res) => {
//     try{
//         let city = req.query.city;
//         let geo = require('./data/geo.json');
//         let location = new Location(geo[0], city);

//         res.send(location);
//     }
//     catch(err) {
//         console.error(err);
//     }
// })

// function Location(obj, city) {
//     this.search_query = city;
// 	this.formatted_query = obj.display_name;
// 	this.latitude = obj.lat;
// 	this.longitude = obj.lon;
// }


// app.use('*', (req, res) => res.send('Sorry, that route dos not exist.'));

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
