# Simple node HTTP sink

## Summary 
A simple node server that will log any HTTP `POST` `PUT` & `GET` request that is sent to the server into an SQLLITE database. The logged data can then be retrieved back using a simple API.

## Installation

1. Install dependencies using `npm install`
2. Run `npm run createdb` to create the sqlite database.
3. Run `node main.js` to start the server at port .
4. Direct your http requests to the server and get them logged.

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