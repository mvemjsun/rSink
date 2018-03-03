# Simple node HTTP sink

## Summary 
A simple node server that will log any HTTP `POST` `PUT` & `GET` request that is sent to the server into an SQLLITE database. The logged data can then be retrieved back using a simple API.

## Installation

1. Install dependencies using `npm install`
2. Run `npm run createdb` to create the sqlite database.
3. Run `node main.js` to start the server at port .
4. Direct your http requests to the server and get them logged.

## API

1. `/api/requestlog/range` with params `from`, `to` optional [`matching`]
Example: `http://localhost:9294/api/requestlog/range?from=2018-03-03 22:10:10&to=2018-03-03 22:50:35` Will get requests logged between the specified time range.

Example: `http://localhost:9294/api/requestlog/range?from=2018-03-03 22:10:10&to=2018-03-03 22:50:35&matching=/user/login` Will gets logs between time range where the request url path contained `/user/login`

2. `http://localhost:9294/api/reset/requestlog` will reset the data in the sqlite database.

3. `http://localhost:9294/ping` will return a text `GNIP` to verify if the server is running.