var express = require('express');
var app = express();
var fs = require("fs");
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
   fs.readFile( __dirname + "/" + "profiles.json", 'utf8', function (err, data) {
       	if (err) {
       		res.end('{"error": "Cannot read file."');
       	} else {
       		res.end( data );
       	}
   });
});

app.get('/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "profiles.json", 'utf8', function (err, data) {
       	if (err) {
       		res.end('{"error": "Cannot read file."');
       	} else {
       		users = JSON.parse( data );
       		var user = users["user" + req.params.id] 
       		res.end( JSON.stringify(user));
       	}
   });
});

app.get('/deleteProfile/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "profiles.json", 'utf8', function (err, data) {
       	if (err) {
       		res.end('{"error": "Cannot read file."');
       	} else {
       		data = JSON.parse( data );
       		delete data["user" + req.params.id];
       		fs.writeFile( __dirname + "/" + "profiles.json", JSON.stringify(data), function (err) {
       			if (err) {
       				res.end('{"error": "Cannot write to file."');
       			} else {
       				res.end( JSON.stringify(data));
       			}
       		});
       	}
   });
})

app.post('/updateProfile', function (req, res) {
   fs.readFile( __dirname + "/" + "profiles.json", 'utf8', function (err, data) {
       	if (err) {
       		res.end('{"error": "Cannot read file."');
       	} else {
       		data = JSON.parse( data );
       		data["user" + req.body.id] = req.body;
       		fs.writeFile( __dirname + "/" + "profiles.json", JSON.stringify(data), function (err) {
       			if (err) {
       				res.end('{"error": "Cannot write to file."');
       			} else {
       				res.end( JSON.stringify(data));
       			}
       		});
       	}
   });
});

app.post('/createProfile', function (req, res) {
   fs.readFile( __dirname + "/" + "profiles.json", 'utf8', function (err, data) {
       	if (err) {
       		res.end('{"error": "Cannot read file."');
       	} else {
       		data = JSON.parse( data );
       		var new_id = getMaxID(data)+1;
       		data["user" + new_id] = req.body;
       		data["user" + new_id].id = new_id;
       		fs.writeFile( __dirname + "/" + "profiles.json", JSON.stringify(data), function (err) {
       			if (err) {
       				res.end('{"error": "Cannot write to file."');
       			} else {
       				res.end( JSON.stringify(data));
       			}
       		});
       	}
   });
});

function getMaxID(data) {
	var max = 0;
	for (var atom in data) {
		if (parseInt(data[atom].id) > max) max = parseInt(data[atom].id);
	}
	return max;
}

var server = app.listen(8081, function () { });