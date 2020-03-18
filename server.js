'use strict';

//libraries
// gets the variables from our hiding place
require('dotenv').config();

// my server
const express = require('express');
const app = express();
// const superagent = require('superagent');

// const cors = require('cors');
// const express = require('express');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.static('./public'));

// the underpaid security guard
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

// superagent.get('url')
//     .then(results => { do something, e.g. console.log('PoL') })
//     .catch(err => console.error(err))

// $.ajax('url', {method: "GET", datatype: "JSON"})
//  .then 

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
//     // let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.YOUR-API-KEY}&q=${city}&format=json`;
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
// app.get('/weather', (request, response) => {
//     // figure out what the front end sent
//     console.log('From the front end: ', request.query);
//     // let city = request.query.search_query;
//     // let formatted_query = request.query.formatted_query;
//     // let latitude = request.query.latitude;
//     // let longitude = request.query.longitude;

//     // get data from the darksky file
//     // try{
//         let weather = require('./data/darksky.json');
//         let weatherArray = weather.daily.data;
//         // let finalWeatherArray = weatherArray.map(day => {
//         //     return new Weather(weather.daily.data[0])       })
        

//         // response.send(forecast);
//     }
//     // catch(err){
//     //     console.error(err);
//     }
// })
// // the query lives in the url after the ? htt://cooldomain.com?city=seattle
  
//   function Weather(obj){
//     this.time = new Date(obj.time * 1000).toDateString();
//     this.forecast = obj.summary;
//   }
  
// ***************

app.get('*', (request, response) => {
  response.status(404).send('Sorry, that route dos not exist.');
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
