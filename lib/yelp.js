// link to .env for environmental variables
require('dotenv').config();

// declare application dependencies
const superagent = require('superagent');

function yelpHandler(request, response) {
  let city = request.query.search_query;
  let url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
  superagent.get(url)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then(results => {
      let newYelp = results.body.businesses.map(biz => {
        return new Yelp(biz);
      });
      response.status(200).send(newYelp);
    }).catch(err => errorHandler(err, response));
};

  function Yelp(obj){
    this.name = obj.name;
    this.image_url = obj.image_url;
    this.price = obj.price;
    this.rating = obj.rating;
    this.url = obj.url;
}

module.exports = yelpHandler;
