// link to .env for environmental variables
require('dotenv').config();

// declare application dependencies
const superagent = require('superagent');

function movieHandler(request, response) {
    let location = request.query.search_query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&query=${location}&page=1&include_adult=false`;
    superagent.get(url)
    .then(results => {
      let movieData = results.body.results;
      let movieResults = movieData.map((dataObj) => (new Movies(dataObj)));
      // only send 20 movies
      response.status(200).send(movieResults);
    }).catch(err => errorHandler(err, response));
  };
  
  function Movies (obj) {
    this.title = obj.title;
    this.overview = obj.overview;
    this.average_votes = obj.vote_average;
    this.total_votes = obj.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${obj.poster_path}`;
    this.popularity = obj.popularity;
    this.released_on = obj.release_date;
  }
  
  module.exports = movieHandler;
