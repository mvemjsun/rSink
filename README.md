# Simple node.js HTTP sink

<img src="https://github.com/mvemjsun/rSink/blob/master/rSink.png" alt="" width="500pt" height="300pt">

## Summary 
A simple node server that will log any HTTP `POST` `PUT` & `GET` request that is sent to the server into an SQLLITE database. The logged data can then be retrieved back using a simple API.

A typical use of this server may be to log and then validate the HTTP requests for their headers and body.

## Installation

1. Clone the repo using `got clone git@github.com:mvemjsun/rSink.git` 
2. Install dependencies using `npm install`
3. Run `npm run createdb` to create the sqlite database.
4. Run `node main.js` to start the server at port defind in package.json, defaults is 9294.
5. Direct your http requests to the server and get them logged.

## API

 | API | Type |Description |
   | --- | --- | --- |
   | http://localhost:9294/api/requestlog/range?from={yyyy-mm-dd hh:mi:ss}&to={yyyy-mm-dd hh:mi:ss} | GET | Get logs in a time range |
   | http://localhost:9294/api/requestlog/range?from={yyyy-mm-dd hh:mi:ss}&to={yyyy-mm-dd hh:mi:ss}?matching=/user | GET | Get logs in a time range with url matching `/user` |
   | http://localhost:9294/api/reset/requestlog | POST | Reset data in sqlite db |
   | http://localhost:9294/ping  | GET  | Returns GNIP if server is loaded |
   | http://localhost:9294/{url} | POST | Will log request in the sqlite db |
   | http://localhost:9294/{url} | PUT  | Will log request in the sqlite db |
   | http://localhost:9294/{url} | GET  | Will log request in the sqlite db |