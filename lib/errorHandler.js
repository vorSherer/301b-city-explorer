'use strict';

function errorHandler (err, response) {
    console.error(err);
    if(response) {
      response.status(500).send('Sorry, I can\'t help with that.');
    }
  }
  
module.exports = errorHandler;  