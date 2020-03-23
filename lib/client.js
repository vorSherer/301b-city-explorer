'use strict';

const pg = require('pg');  // connects to the server that the database is on

const client = new pg.Client(process.env.DATABASE_URL);

client.on('error', err => errorHandler(err));

module.exports = client;
