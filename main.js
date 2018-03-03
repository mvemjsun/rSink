let config = require('./package').config
var express = require('express');
var app = express();
var path = require('path');
var sqlite = require('sqlite3');
var bodyParser = require('body-parser');
var requestAdapter = require('./adapt_request');
var dbLoader = require('./dbLoader');
var saveLogs = require('./save_request')
var fetch = require('./get_logs')
var reset = require('./reset_db')

var db = dbLoader.getDbHandle(sqlite);

var bPoptions = {
  inflate: true,
  limit: '100kb',
  type: '*/*'
};

app.use(bodyParser.text(bPoptions));
app.use(bodyParser.json(bPoptions));


app.get('/api/requestlog/range', function(req, res) {
	fetch.fetchLogs(req, db).then(data => {
		res.send((data));	
	}).catch(data => {
		res.send(data);
	})
});

app.get('/ping', function(req, res) {
	res.type('text/plain');
	res.status(200).send('GNIP');
});

app.post('/api/reset/requestlog', function(req, res) {
	reset.resetDb(db).then( data => {
		res.send(data);
	}).catch(data => {
		res.send(data);
	})
});

app.post('/*', function(req, res) {
	const requestData = requestAdapter.adaptRequest(req);
	saveLogs.saveRequest(requestData, db);
	res.type('text/plain');
	res.status(200).send('Received POST/*');
});

app.get('/*', function(req, res) {
	const requestData = requestAdapter.adaptRequest(req);
	saveLogs.saveRequest(requestData, db);
	res.type('text/plain');
	res.status(200).send('Received GET/*');
});

app.put('/*', function(req, res) {
	const requestData = requestAdapter.adaptRequest(req);
	saveLogs.saveRequest(requestData, db);
	res.type('text/plain');
	res.status(200).send('Received PUT/*');
});

app.listen(config.port);
console.log(`${config.port} is the magic port!`);