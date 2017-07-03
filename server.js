const port = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser')
var {mongoose} = require('./server/db/mongoose');

var {ECC} = require('./server/models/ecc');
var ecc = require('./server/ec/ec-s');

var app = express();

app.use(bodyParser.json());

// ROUTES

app.post('/groupedData/finn/:category', function(req, res){

	var category = req.params.category;
	console.log(category);
	ECC.find({category}).then((eccs) =>{
		res.send({eccs});
	}, (e) => {
		qres.status(400).send(e);
	})
	
});

app.get('/categories/finn', function(req, res){

	return res.send({categories:ecc.finn.categories});

});

app.get('/scrape/finn', function(req, res){

	ecc.finn.categories.forEach((category) => {
		ecc.markedCategoryAmount('Finn', category).then((amount)=>{
			amount.save().then((doc)=>{
				console.log('doc');
				return res.send(doc);
			}, (e) =>{
				return res.status(400).send(e);
			})
		},(e)=>{
			return console.log(e);
		});
	});

});

app.use(express.static(__dirname + '/server/public/'));
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/server/public/index.html');
})

app.listen(port);

console.log('Magic happens on port', port);

exports = module.exports = app;