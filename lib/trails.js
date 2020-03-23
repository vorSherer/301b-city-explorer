// link to .env for environmental variables
require('dotenv').config();

// declare application dependencies
const superagent = require('superagent');

function hikingHandler(request, response) {
    console.log(request.query);
    let {latitude, longitude} = request.query;
    let url = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${process.env.TRAILS_API_KEY}`;
    superagent.get(url)
    .then(results => {
      console.log(results.body.trails);
      let dataObj = results.body.trails.map(trail => new Hiking(trail));
      response.status(200).send(dataObj);
    }).catch(err => errorHandler(err, response));
  };
  
  function Hiking(obj) {
    this.name = obj.name;
    this.location = obj.location;
    this.length  = obj.length;
    this.stars = obj.stars;
    this.star_votes = obj.starVotes;
    this.summary = obj.summary;
    this.trail_url = obj.url;
    this.conditions = obj.conditionStatus;
    this.condition_date = obj.conditionDate.slice(0,10);
    this.condition_time = obj.conditionDate.slice(11,19);
  }
  
  module.exports = hikingHandler;
  
  