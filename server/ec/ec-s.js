var request = require('request');
var cheerio = require('cheerio');

var {ECC} = require('../models/ecc');

var ecs = { 
	finn:
	{
		categories:
		[
			'Antikviteter og kunst',
			'Dyr og utstyr',
			'Elektronikk og hvitevarer',
			'Foreldre og barn',
			'Fritid, hobby og underholdning',
			'Hage, oppussing og hus',
			'Klær, kosmetikk og accessoirer',
			'Møbler og interiør',
			'Næringsvirksomhet',
			'Sport og friluftsliv',
			'Utstyr til bil, båt og MC',
		],
		urls:[
			'bap/forsale/search.html?category=0.76',
			'bap/forsale/search.html?category=0.77',
			'bap/forsale/search.html?category=0.93',
			'bap/forsale/search.html?category=0.68',
			'bap/forsale/search.html?category=0.86',
			'bap/forsale/search.html?category=0.67',
			'bap/forsale/search.html?category=0.71',
			'bap/forsale/search.html?category=0.78',
			'bap/forsale/search.html?category=0.91',
			'bap/forsale/search.html?category=0.69',
			'bap/forsale/search.html?category=0.90',
		],
		getAmount: (url, company, category) => {
			return new Promise((resolve, reject) => {
				request(url, (error, response, html) => {
				    if(!error){
				        var $ = cheerio.load(html);
					    $('.current-hit-count').filter(function(){
					    	let amount = $(this).children()
					    	.first().text().replace(/\s/g, '');
			            	var ecc = new ECC({
								company,
				            	category,
				            	timeStamp: new Date(),
				            	amount
							});
							console.log(ecc);
				            resolve(ecc)
				        });
				    }else{
				    	reject({error})
				    }
				});
			});
		},
		getStats: (url, company, category) => {
			return new Promise((resolve, reject) => {
			
			});
		}
	}
};


var markedCategoryAmount = (company, category) => {
	if(company === 'Finn'){
		return ecs.finn.getAmount('https://www.finn.no/' + 
			ecs.finn.urls[ecs.finn.categories.indexOf(category)],
			company, category);
	}
}

module.exports = {
	finn:{
		categories: ecs.finn.categories
	},
	markedCategoryAmount
};