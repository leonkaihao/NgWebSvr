var config = require('../config').data;

var httpsReq = require('./httpsReq.js');
//var http = require('http');


exports.appReq = function (hostname, auth, path, method, reqData, cb) {
    //Get one tenant from Tenant server
    var options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: method, 
        auth : auth,
        rejectUnauthorized: false , 
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    Req.httpsReq(options, reqData, function (reqRes) {
        var resData = reqRes;      
        cb(null,resData);
    }, function (errMsg) {
        cb(errMsg, null);
    });
};

