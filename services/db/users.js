'use strict';

//var mongoose = require('mongoose');
var model = require("./model.js");
var uuid = require('uuid');

var userObj = exports = module.exports = {};

var accountModel = model.AccountModel;
var userProfileModel = model.UserProfileModel;

userObj.init = function (ap) {
    userObj.app = ap;
    userObj.db = ap.DB;
};

/**
* Accounts operations
*/

userObj.getRoleNameList = function(cb) {
    cb(model.roleNames);
};

userObj.authAccount = function (roleType, userName, password, cb) {
    console.log(roleType, userName, password);
	accountModel.findOne({
        'userName': userName, 
        'password': password,
        //'roles': { $elemMatch: {type: roleType} }
    }).select('id userName nickName roles').exec(function (err, account) {
		if (err) {
			cb(err, null);
        } else if (!account) {
			cb(new Error("Auth failed"), null);
		} else {
            cb(null, account);
		}
    });
};

userObj.headAccount = function(userName, cb) {
    accountModel.findOne({
        'userName': userName
    }).select('id').exec(function (err, account) {
        if (err) {
            cb(err, null);
        } else if (!account) {
            cb(new Error("Account not found"), null);
        } else {
            cb(null, account);
        }
    });
};

userObj.createAccount = function (userName, password, userObj, cb) {
    var accountInfo = {
        id: uuid.v4(),
        userName: userName,
        password: password,
        nickName: '',
        roles: []
    };
    if (userObj.nickName) {
        accountInfo.nickName = userObj.nickName;
    }
    if (userObj.roles) {
        accountInfo.roles = userObj.roles;
    }
    var newAccount = new accountModel(accountInfo);
    newAccount.save ( function ( err, account ){
        if (err) {
            cb(err, null);
        } else {
            var result = {
                id: account.id
            };
            cb(null, result);
        }
    });
};


userObj.updateAccountSelf = function (accountId, accountObj, cb) {
    accountModel.findOne({
        'id': accountId
    }, function (err, account) {
        if (err) {
            cb(err, null);
        } else if (!account) {
            cb(new Error("Account not found"), null);
        } else {
            for (key in accountObj) {
                if (key === 'passwordOld') {
                    if (account.password !== accountObj.passwordOld) {
                        cb(new Error("check old password failed"), null);
                        return;
                    }
                    if (!accountObj.passwordNew) {
                        cb(new Error("check new password failed"), null);
                        return;                        
                    }
                    account.password = accountObj.passwordNew;
                    account.modifyOn = Date.now();
                }
                if (key === 'nickName') {
                    user.nickName = accountObj.nickName;
                }
            }
            account.save(function (err, result) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, account);
                }
            });
        }
    });
};

userObj.updateAccount = function (accountId, accountObj, cb) {
    accountModel.findOne({
        'id': accountId
    }, function (err, account) {
        if (err) {
            cb(err, null);
        } else if (!account) {
            cb(new Error("Account not found"), null);
        } else {
            for (key in accountObj) {
                if (key === 'password') {
                    account.password = accountObj.password;
                    account.modifyOn = Date.now();
                }
                if (key === 'nickName') {
                    user.nickName = accountObj.nickName;
                }

                if (key === 'roles') {
                    user.roles = accountObj.roles;
                }
            }
            account.save(function (err, result) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, account);
                }
            });
        }
    });
};

userObj.getAccountInfo = function (accountId, cb) {
    var acId = accountId;
    accountModel.findOne({id: acId})
    .select('id userName nickName roles createOn modifyOn enabled')
    .exec(function (err, account) {
        if (err) {
            cb(err, null)
        } else if (!account) {
            cb(new Error("Can not find account by account id " + acId), null);
        } else {
            cb(null, account);
        }
    });
};


/**
* get account list
*   
*/
userObj.getAccountList = function (tenantId, offset, limit, cb) {
    accountModel.find({roles: {$elemMatch: {tenantId: tenantId}}})
    .skip(offset)
    .limit(limit)
    .select('id userName nickName roles createOn modifyOn enabled')
    .exec(function(err, accounts) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, accounts);
        }
    });
};