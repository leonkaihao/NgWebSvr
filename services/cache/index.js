'use strict';

var sessions = require("./sessions.js");

var cache = exports = module.exports = {
	Sessions: sessions
};

cache.init = function(cb) {
	sessions.init(cache, function(err){
		cb(err);
	});
};