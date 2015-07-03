var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/* create user session */
/* this happened when a client open site page*/
router.post('/', function(req, res){
	users.createSession(function(statusCode, result) {
		res.status(statusCode).json(result);
	});
});

router.head('/', function(req, res){
	var token = req.query.token;
	users.getUser(token, function (statusCode, result) {
		res.status(statusCode).end();
	});	
});

/*user login*/
router.post('/user', function(req, res){
	
	var token = req.query.token;
	var obj = {};
	obj.userName = req.body.data.user_name;
	obj.password = req.body.data.password;
	obj.securityCode = req.body.data.security_code;
    users.auth(token, obj, function (statusCode, result) {
		res.status(statusCode).json(result);
	});	
});

/* user log out */
router.delete('/user', function(req, res){
	var token = req.query.token;
	users.signOut(token, function (statusCode, result) {
		res.status(statusCode).json(result);
	});	
});

router.get('/user', function(req, res){
	var token = req.query.token;
	users.getUser(token, function (statusCode, result) {
		res.status(statusCode).json(result);
	});	
});

module.exports = router;