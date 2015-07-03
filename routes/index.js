var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'MySite' });
});

//
router.get('/:spec', function(req, res) {
	res.render('index', { title: 'MySite' });
});

//for angular partial page service
router.get('/partial/:spec', function(req, res) {
	res.render(req.params.spec, { title: 'MySite' });
});

module.exports = router;
