'use strict';

//libraries
require('dotenv').config();

// my server
const express = require('express');
const app = express();
const cors = require('cors');
// const superagent = require('superagent');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(errorHandler);
// app.use(express.static('./public'));


// superagent.get('url')
//     .then(results => { do something, e.g. console.log('PoL') })
//     .catch(err => console.error(err))

// $.ajax('url', {method: "GET", datatype: "JSON"})
//  .then (results => // do something)

app.get('/location', (request, response) => {
  // this is the city that the front end is sending us in the qurey
  // the query lives in the url after the ? htt://cooldomain.com?city=seattle
  try{
    let city = request.query.city;
    console.log('😎', city);
    let geo = require('./data/geo.json');
    let location = new Location(geo[0], city)
    response.send(location);
  }
  catch(err){
    response.status(500).send(err);
    console.error(err);
  }
})

// NEW Live Location Route - under construction:
// app.get('/location', (request, response) => {
//   // this is the city that the front end is sending us in the qurey
//   // the query lives in the url after the ? htt://cooldomain.com?city=seattle
//   try{
//     let city = request.query.city;
//     // let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;
//     // superagent.get(url)

//     // let geo = require('./data/geo.json');
//     // let location = new Location(geo[0], city)
//     // response.send(location);
//   }
//   catch(err){
//     response.status(500).send(err);
//     console.error(err);
//   }
// })


function Location(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

// **************
app.get('/weather', (request, response) => {
    // figure out what the front end sent
//     console.log('From the front end: ', request.query);
//     // let city = request.query.search_query;
//     // let formatted_query = request.query.formatted_query;
//     // let latitude = request.query.latitude;
//     // let longitude = request.query.longitude;

    // get data from the darksky file
  // try{
  let weather = require('./data/darksky.json');
  let weatherArray = weather.daily.data;
  const forecastArray = weatherArray.map(day => {
    return new Weather(day);  //weather.daily.data[0])       })
  });
  response.send(forecastArray);
})
//     // catch(err){
//     //     console.error(err);
//     }
// })
// // the query lives in the url after the ? htt://cooldomain.com?city=seattle
  
  function Weather(obj){
    this.time = new Date(obj.time * 1000).toDateString();
    this.forecast = obj.summary;
  }
  
// ***************

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send({ status: 500, responseText: 'Sorry, something went wrong'})
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
