var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/* get all user accounts info  */
router.get('/', function (req, res) {
    var token = req.query.token;
    var obj = {
        offset: req.query.offset,
        limit: req.query.limit,
        tenantId: req.query.tenantId
    };
    //todo:
    users.getAccounts(token, obj, function (statusCode, result) {
        res.status(statusCode).json(result);
    }); 
});

/* create user, user sign up. */
//FIXME: 创建用户不只是tenant，以后还会有其他角色，所以api需要改！
router.post('/', function (req, res) {
    var token = req.body.params.token;
    var obj = {
        userName: req.body.data.user_name,
        password: req.body.data.password,
        nickName: req.body.data.nick_name,
        role: req.body.data.role,
        tenantId : req.body.data.tenant_id,
        products : req.body.data.products,
    };
	//todo: check token
	//todo: verify checkcode
	//...
    users.creatAccount(token, obj, function (statusCode, result) {
        res.status(statusCode).json(result);
    }); 
});

/* get account info  by id*/
router.get('/:accountId', function (req, res) {
    var token = req.query.token;
    var accountId = req.url.substring(1, req.url.indexOf('?'));
    users.getAccountInfo(token, accountId, function (statusCode, result) {
        res.status(statusCode).json(result);
    });
});

/* update account info by id*/
router.put('/:accountId', function (req, res) {
    
    var token = req.query.token;
    var accountId = req.url.substring(1, req.url.indexOf('?'));
    var accountObj = {};
    if (req.body.data.nick_name) {
        accountObj.nickName = req.body.data.nick_name;
    }
    if (req.body.data.password) {
        accountObj.password = req.body.data.password;
    }
    if (req.body.data.enable) {
        accountObj.enable = req.body.data.enable;
    }
    users.updateAccount(token, accountId, accountObj, function (statusCode, result) {
        res.status(statusCode).json(result);
    }); 
});

/* add role for account info by id*/
router.post('/:accountId/roles', function (req, res) {

    var accountId = req.url.substring(1, req.url.indexOf('/roles'));
    /*var token = req.query.token;
    

    users.getAccounts(obj, function (statusCode, result) {
        res.status(statusCode).json(result);
    });*/
});

/* update role for account info by id*/
router.put('/:accountId/roles', function (req, res) {
    var accountId = req.url.substring(1, req.url.indexOf('/roles'));
    /*var token = req.query.token,

    //todo:
    users.getAccounts(obj, function (statusCode, result) {
        res.status(statusCode).json(result);
    }); */
});
module.exports = router;
