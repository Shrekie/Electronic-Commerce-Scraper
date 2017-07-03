var mongoose = require('mongoose');

var ECC = mongoose.model('ECC', {

	company:{
		type: String,
		required: true,
		minlength:1,
		trim: true // removes leading or trailing whitespace
	},
	timeStamp:{
		type: Date,
		required: true
	},
	category:{
		type: String,
		required: true,
		minlength:1,
		trim: true // removes leading or trailing whitespace
	},
	amount:{
		type: Number,
		required: true,
		minlength:1,
		trim: true // removes leading or trailing whitespace
	}

});

module.exports = {ECC}