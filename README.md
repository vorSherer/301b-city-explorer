# 301b-city-explorer
City Explorer project (Labs 6 - 9).

**Author(s)**: Thomas Sherer

**Version**: 1.3.1 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
Given that a user enters a city in the Browser (Front End), the server (Back End) responds with a map and selected data for that city.

## Getting Started
Create a new repo on GitHUb with README.md and License, clone that down to your local machine (in a linux terminal).
Create the file structure, build a simple server (server.js file).

<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
Use Node and npm; run npm init, then npm install -S cors dotenv express pg superagent.
This application uses a PostgreSQL database, which you will need to setup in a POSIX environment (Mine was in Ubuntu Linux running in WSL).
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.
-->
# Feature Build History
## Feature #: Initial build-out
### Estimate of time needed to complete
2 hrs.
### Start date and time
2020-03-17 0830 am - Created repo, built out and populated file structure, Did code review with Yasir.

### Finish time
NN am
### Actual time needed to complete
NN min

## Feature #: Lab 6 Features 1 - 2
### Estimate of time needed to complete
NN
### Start date and time
NN am
### Finish time
NN am
### Actual time needed to complete
NN min

## Feature #: Lab 7 Features 1 - 3, Lab 8 Feature 1
### Estimate of time needed to complete
5 hrs.
### Start date and time
2020-03-18, 0930 am
### Finish time
2020-03-18, 1330 pm
### Resumed date and time
2020-03-19, 1000 am
### Finish time
2020-03-19, 1200 pm
### Actual time needed to complete
6 hrs.

## Feature #: Lab 7 Feature 4
### Estimate of time needed to complete
2 hrs
### Start date and time
2020-03-19, 1930 pm
### Finish time
2020-03-19, 2100 pm
### Resumed date and time
2020-03-20, 1030 am
### Finish time
2020-03-20, 1100 am
### Actual time needed to complete
2 hrs.


## Feature #: Lab 8 Feature 2
### Estimate of time needed to complete
1 hr.
### Start date and time
2020-03-19, 2100 pm
### Finish time
2020-03-19, 2230 pm
### Actual time needed to complete
1 hr. 30 min.


## Feature #: Lab 8 Features 3 - 4, Lab 9 Features 1 - 2
### Estimate of time needed to complete
5 hrs.
### Start date and time
2020-03-20, 1030 am
### Finish time
2020-03-20, 1300 pm
### Actual time needed to complete
2 hrs. 30 min.


## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
Lab 6 - Yasir Mohamud;
Lab 7 - Corey DeJong;
Lab 8 - Jesse Peña (With major assist from Iris Leal on integrating sql with location route handler!)
Lab 9 - Alex Peña

Technical assistance from Chance Harmon, JB Tellez, and Nicholas Carignan.  Thank you all!


### Links and Resources
* [submission PR](http://xyz.com)
* Any Links you used as reference
CSS reset file:
	https://meyerweb.com/eric/tools/css/reset/

### Setup
.gitignore:     https://www.gitignore.io/api/node,macos,linux,windows,webstorm,visualstudiocode
Node and npm  (I used node v10.19.0 and npm 6.13.4)
DEPENDENCIES
    "dotenv": "^8.2.0",
    "express": "^4.17.1"
    nodemon

#### `.env` requirements
* `PORT` - 3000
* `DATABASE_URL` - URL to the running mongo instance/db
* any environment variables like api keys as needed

#### Running the app
* `npm start`
* Endpoint: `/foo/bar/`
  * Returns a JSON object with abc in it.
* Endpoint: `/bing/zing/`
  * Returns a JSON object with xyz in it.

### Reflections and Comments
* Consider including the answers to your daily journal and submission questions here
* This is also a good place to reflect on the tools and resources used and learned

### Time Records

