// const { Client } = require('pg')
// const client = new Client({
  // user: 'someuser',
  // host: 'localhost',
  // database: 'somedata',
  // password: 'nRIUCIN2XrJAZigmBffw',
  // // port: 3211,
// })

// ftp://ftp.unicode.org/Public/3.0-Update/UnicodeData-3.0.0.html

// client.connect()
// if (!String.prototype.padStart) {
    // String.prototype.padStart = function padStart(targetLength,padString) {
        // targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        // padString = String((typeof padString !== 'undefined' ? padString : ' '));
        // if (this.length > targetLength) {
            // return String(this);
        // }
        // else {
            // targetLength = targetLength-this.length;
            // if (targetLength > padString.length) {
                // padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            // }
            // return padString.slice(0,targetLength) + String(this);
        // }
    // };
// }

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
	// console.log(req.query);

	if (req.body && req.body.txt){
		console.log(req.body.txt);
		// let str  = "прывітанка! Ў🐒です";
		// let val = getCode("Ы");
		let arr = [];
		// 1F412;MONKEY
		let mapping  = [];
		for (letter of req.body.txt) {
			let val = getCode(letter);
			// mapping.push({[letter]: val});
			mapping.push([letter, val]);
			// console.log(letter, val);
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
					  // message: 'Retrieved ALL puppies'
					});
				})
				.catch(function (err) {
				  return next(err);
				});
		}
	}
	

}

app.listen(port);

// db.any("SELECT codeval, charname from unidata where codeval = ANY($1)", [arr])
    // .then(data => {
		// console.log(data);
        // return data;
    // });
	
	
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
// client.query('SELECT codeval, charname from unidata where codeval = $1', [val], (err, res) => {
// client.query('SELECT codeval, charname from unidata where codeval = ANY($1)', [arr], (err, res) => {
  // console.log(err ? err.stack : JSON.stringify(res.rows));
  // client.end()
// })