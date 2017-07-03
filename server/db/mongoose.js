var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //set promise library to global
mongoose.connect('mongodb://localhost:27017/ECCS');

module.exports = {mongoose};
