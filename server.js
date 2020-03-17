'use strict';

//libraries

// my server
const express = require('express');
const app = express();

// gets the variables from our hiding place
require('dotenv').config();

// the underpaid security guard
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

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
    console.error(err);
  }
})

function Location(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

app.get('*', (request, response) => {
  response.status(404).send('there is nothing on this page');
})

// turn on the server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})


// require('dotenv').config();
// const cors = require('cors');
// const express = require('express');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.static('./public'));

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
