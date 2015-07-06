
'use strict';
var sessions = require('../services/cache').Sessions;

exports.createSession = function (cb) {
	sessions.createSession(function (err, data) {
		var result = {};
        var statusCode = 200;
		if (!err) {
			result.token = data;
		} else {
            statusCode = 500;
            result.code = '1109';
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
            result.code = '1110';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        } else if (!valid) {            
            statusCode = 403;
            result.code = '1110';
            result.description = result.message = "verify failed";
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};

exports.auth = function(token, obj, cb) {
	users.authAccount(obj.role, obj.userName, obj.password, function(err, doc){
		var result = {};
        var statusCode = 200;
		if (!err) {
            sessions.updateSession(token, doc, function(err, data) {
                if (!err) {
                    result = {
                      user_id: doc.acId,
                      user_name: doc.userName,
                      type: doc.roles[0].type,
                      nick_name: doc.nickName
                    }
                    cb(statusCode, result);
                } else {                    
                    statusCode = 500;
                    result.code = '1109';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                    cb(statusCode, result);
                }
            });
		} else {
            statusCode = 500;
            result.code = '1109';
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
            result.code = '1110';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};

exports.getUser = function (token, cb) {
    sessions.getSessionAttr(token, ['id', 'userName', 'nickName'], function(err, data) {
        var result = {};
        var statusCode = 200;
        if (!err) {
            result = {
                user_id: data.userId,
                user_name: data.userName,
                nick_name: data.nickName
            };
            statusCode = 200;
        } else {
            statusCode = 500;
            result.code = '2001';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
        }
        cb(statusCode, result);
    });
};