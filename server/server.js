var express = require('express');
var bodyParser = require('body-parser');
var tediousExpress = require('express4-tedious');
var connection = {
	"server": "<<server name or ip>>",
	"userName": "<<user name>>",
	"password": "<<password>>",
	"options": {
		"encrypt": true,
		"database": "<<database name>>"
	}
};
var PORT = process.env.PORT || 8088;
var app = express();
app.use(function (req, res, next) {
	req.sql = tediousExpress(connection);
	next();
});

app.use(bodyParser.text());

/* GET data. */
app.get('/data', function (req, res) {
	req.sql("select * from todo for json path")
		.into(res, '[]');
});

app.get('/ping', function (req, res) {
	console.log('pong');
	res.status(200).json('pong');
});

var server = app.listen(PORT, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://' + host + ':' + port);
});