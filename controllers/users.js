'use strict';
var users = require("../services/db").Users;
var sessions = require('../services/cache').Sessions;

var uuid = require('uuid');

exports.createSession = function(cb) {
	sessions.createSession(function(err, data){
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
    sessions.verifyToken(token, function(err, data){
        var result = {};
        var statusCode = 200;
        if (err) {
            statusCode = 404;
            result.code = '1110';
            result.message = err.message;
            result.description = err.message;
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

exports.signUp = function(token, accountObj, cb) {
	users.createAccount(accountObj.userName, accountObj.password, accountObj, function(err, doc){
        var statusCode = 201;
		var result = {};
		if (!err) {
			result.resultCode = 'S';
			result.content = {uid: ''};
		} else {
            statusCode = 403;
			result.code = '1109';
			result.message = err;
            result.description = err.message;
            result.source = '<<webui>>';
        }
		cb(statusCode, result);
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
    sessions.verifyToken(token, function(err, enable){
        var result = {};
        var statusCode = 200;
        if (!err && enable) {
            sessions.getSessionObject(token, function(err, data) {
                var result = {};
                var statusCode = 200;
                if (!err) {
                    result = data;
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
        } else {
            statusCode = 500;
            result.code = '1102';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
};



exports.getAccounts = function (token, obj, cb) {
    sessions.verifyToken(token, function(err, enable){
        var result = {};
        var statusCode = 200;
        if (!err && enable) {
            users.getAccountList(obj.tenantId, obj.offset, obj.limit, function (err, doc) {
                var result = {};
                var statusCode = 200;
                if (!err) {
                    result = {
                      "total": obj.limit,  //总数
                      "offset": obj.offset, //实际偏移量
                      "count": doc.length,  //实际个数
                      "accounts": []
                    }
                    for (var i = 0; i < doc.length; i++) {
                        var account = {
                            id: doc[i].id,
                            user_name: doc[i].userName,
                            nick_name: doc[i].nickName,
                            enable:  doc[i].enabled,
                            roles:  doc[i].roles
                        }
                        result.accounts.push(account);
                    };
                } else {
                    statusCode = 500;
                    result.code = '2001';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                }
                cb(statusCode, result);
            });
        } else {
            statusCode = 500;
            result.code = '1102';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
};



exports.creatAccount = function(token, accountObj, cb) {

    sessions.verifyToken(token, function(err, enable){
        var result = {};
        var statusCode = 200;
        if (!err && enable) {
            users.createAccount(accountObj.userName, accountObj.password, accountObj, function(err, doc){
                var result = {};
                var statusCode = 200;
                if (!err) {
                    result = {account_id: doc.id};
                } else {
                    statusCode = 500;
                    result.code = '2001';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                }
                cb(statusCode, result);
            });
        } else {
            statusCode = 500;
            result.code = '1102';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });

};

exports.getAccountInfo = function (token, accountId, cb) {
    sessions.verifyToken(token, function(err, enable){
        var result = {};
        var statusCode = 200;
        if (!err && enable) {
            users.getAccountInfo(accountId, function (err, doc) {
                var result = {};
                var statusCode = 200;
                if (!err) {
                    result = doc;
                } else {
                    statusCode = 500;
                    result.code = '2001';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                }
                cb(statusCode, result);
            });
        } else {
            statusCode = 500;
            result.code = '1102';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
};


exports.updateAccount = function (token, accountId, accountObj, cb) {
    sessions.verifyToken(token, function(err, enable){
        var result = {};
        var statusCode = 200;
        if (!err && enable) {
            users.updateAccount(accountId, accountObj, function (err, doc) {
                if (!err) {
                    result = doc;
                } else {
                    statusCode = 500;
                    result.code = '2001';
                    result.message = err.message;
                    result.description = err.message;
                    result.source = '<<webui>>';
                }
                cb(statusCode, result);
            });
        } else {
            statusCode = 500;
            result.code = '1102';
            result.message = err.message;
            result.description = err.message;
            result.source = '<<webui>>';
            cb(statusCode, result);
        }
    });
};