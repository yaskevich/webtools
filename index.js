const path = require('path');
require('dotenv').config()
// const promise = require('bluebird');
// const pgp = require('pg-promise')({ promiseLib: promise });
const express = require('express');
const createError = require('http-errors');
// const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

// const conObject  = {
    // host: process.env.PGHOST || 'localhost',
    // port: process.env.PGPORT || 5432,
    // database: process.env.PGDATABASE,
    // user: process.env.PGUSER, 
	// password: process.env.PGPASSWORD
// };

// const db = pgp(conObject);
const app = express();
const port = process.env.PORT;
const uniArr = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'unicode-data.json')), 'utf8');
const uniKV = Object.fromEntries(uniArr.map(item => [item.codeval, item]));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/char', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'char.html'));
});

app.get('/latbe', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'be.html'));
});

app.get('/latru', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'ru.html'));
});

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/uni', getChars);

function getChars(req, res, next) {
	if (req.body && req.body.txt){
		console.log(req.body.txt);
		// let arr = [];
		let mapping  = [];
		let dataObject = {};
		for (letter of req.body.txt) {
			let val = letter.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
			mapping.push([letter, val]);
			
			if (!Reflect.getOwnPropertyDescriptor(dataObject, val)) {
				dataObject[val] = uniKV[val]["charname"];
			}
			 // if (arr.indexOf(val) === -1) {
				// arr.push(val);				
			 // }
		}	
		
		if (Object.keys(dataObject).length){
		// if (arr.length){
			res.status(200).json({status: 'success', data: {content: dataObject, mapping: mapping},});
			// db.any("SELECT codeval, charname from unidata where codeval = ANY($1)", [arr])
				// .then(function (data) {
				  // res.status(200)
					// .json({
					  // status: 'success',
					  // data: {content: arrayToObject(data), mapping: mapping},
					// });
				// })
				// .catch(function (err) {
				  // return next(err);
				// });
		}
	}
}

// const arrayToObject = (array) =>
   // array.reduce((obj, item) => {
     // obj[item.codeval] = item.charname;
     // return obj
   // }, {}
// );

app.listen(port||8080);