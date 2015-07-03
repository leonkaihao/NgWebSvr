'use strict';
var stripJson = require('strip-json-comments');

var fs = require('fs');

var configuration = exports = module.exports = {
    data: {},
    load: function(cfgFile, cb) {
        var data = fs.readFileSync(cfgFile, {encoding: 'utf8'});
        if (!data) {
            cb(new Error('Failed to load config file' + cfgFile));
        }
        try {
            configuration.data = JSON.parse(stripJson(data));
        } catch (err) {
            cb(err);
        }        
        return configuration;
    }
};
