function getCode(x){
	return x.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
}

const conObject  = {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER, 
	password: process.env.PGPASSWORD
};

const promise = require('bluebird');
const options = {
    promiseLib: promise,
};
const pgp = require('pg-promise')(options);
const db = pgp(conObject);

var express = require('express');
// var router = express.Router();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();
const port = process.env.PORT || 5151;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit:50000 }));
// app.use(bodyParser.json({limit: "50mb"}))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/char', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/public/char.html'));
});
app.get('/latbe', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/public/be.html'));
});
app.get('/latru', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/public/ru.html'));
});


app.get('/', function(req, res, next) {
  res.render('index.html');
});


app.post('/api/uni', getChars);

const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     obj[item.codeval] = item.charname;
     return obj
   }, {})

function getChars(req, res, next) {
	if (req.body && req.body.txt){
		console.log(req.body.txt);
		let arr = [];
		let mapping  = [];
		for (letter of req.body.txt) {
			let val = getCode(letter);
			mapping.push([letter, val]);
			 if (arr.indexOf(val) === -1) {
				arr.push(val);				
			 }
		}	
		if (arr.length){
			db.any("SELECT codeval, charname from unidata where codeval = ANY($1)", [arr])
				.then(function (data) {
				  res.status(200)
					.json({
					  status: 'success',
					  data: {content: arrayToObject(data), mapping: mapping},
					});
				})
				.catch(function (err) {
				  return next(err);
				});
		}
	}
}

app.listen(port);