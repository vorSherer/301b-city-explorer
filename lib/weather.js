// link to .env for environmental variables
require('dotenv').config();

// declare application dependencies
const superagent = require('superagent');

function weatherHandler(request, response) {
    let latitude = request.query.latitude;
    let longitude = request.query.longitude;
    let url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;
    superagent.get(url)
    .then(results => {
      let weatherArray = results.body.daily.data;
      let forecastArray = weatherArray.map(day => new Weather(day));
      response.status(200).send(forecastArray);
    }).catch(err => errorHandler(err, response));
  };
  
  function Weather(obj) {
    this.time = new Date(obj.time * 1000).toDateString();
    this.forecast = obj.summary;
  }
  
  module.exports = weatherHandler;
