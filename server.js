'use strict';

// link to .env for environmental variables
require('dotenv').config();

// declare application dependencies
const cors = require('cors');
const express = require('express');
const superagent = require('superagent');

// application setup
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());


// endpoint calls
app.get('/location', (request, response) => {
  // try{
    const city = request.query.city;
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;
    superagent.get(url)
      .then(results => {
        const location = new Location(results.body[0], city)
        response.status(200).send(location);
      }).catch(err => errorHandler(err, response));
})


// **************

app.get('/weather', (request, response) => {

// // figure out what the front end sent
//   // console.log('From the front end: ', request.query);
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
  });
}); 

// Constructor functions
function Location(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}
    

function Weather(obj){
  this.time = new Date(obj.time * 1000).toDateString();
  this.forecast = obj.summary;
}
  
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

// turn on the server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
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
