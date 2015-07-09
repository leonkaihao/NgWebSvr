
'use strict';
var sessions = require('../services/cache').Sessions;
var users = require("../services/db").Users;

exports.createSession = function (cb) {
	sessions.createSession(function (err, data) {
		var result = {};
        var statusCode = 200;
		if (!err) {
			result.token = data;
		} else {
            statusCode = 500;
            result.code = 'e1109';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
		}
		cb(statusCode, result);
	});
};

exports.verifyToken = function(token, cb) {
    sessions.verifyToken(token, function(err, valid){
        var result = {};
        var statusCode = 200;
        if (err) {
            statusCode = 403;
            result.code = 'e1110';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        } else if (!valid) {            
            statusCode = 403;
            result.code = 'e1110';
            result.description = result.message = "verify failed";
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};

exports.createUser = function(token, obj, cb) {
	users.verifyUser(obj.userName, obj.password, function(err, doc){
		var result = {};
        var statusCode = 200;
		if (!err) {
            var userData = {
                userId: doc.id,
                userName: doc.userName,
                nickName: doc.nickName
            };
            sessions.updateSession(token, userData, function(err, data) {
                if (!err) {
                    result = {
                      user_id: doc.id,
                      user_name: doc.userName,
                      nick_name: doc.nickName
                    };
                    cb(statusCode, result);
                } else {                    
                    statusCode = 500;
                    result.code = 'e1109';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                    cb(statusCode, result);
                }
            });
		} else {
            statusCode = 500;
            result.code = 'e1109';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
	});
};

exports.signOut = function (token, cb) {
    sessions.clearSession(token, function(err, data) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            statusCode = 200;
        } else {
            statusCode = 500;
            result.code = 'e1110';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};

exports.getUser = function (token, cb) {
    sessions.getSessionAttrs(token, ['userId', 'userName', 'nickName'], function(err, data) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            if (!data.userId) {
                statusCode = 404;
                result.code = 'e0004';
                result.description = result.message = 'No user logged';
                result.source = '<<webui>>';
            } else {
                statusCode = 200;
                result = {
                    user_id: data.userId,
                    user_name: data.userName,
                    nick_name: data.nickName
                };
            }
        } else {
            statusCode = 404;
            result.code = 'e2001';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};