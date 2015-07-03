'use strict';

var sessions = require("./sessions.js");
var products = require('./products.js');

var cache = exports = module.exports = {
	Sessions: sessions,
	Products: products
};

cache.init = function(cb) {
	sessions.init(cache, function(err){
		cb(err);
	});
	products.init(cache, function(err){
		cb(err);
	});
};