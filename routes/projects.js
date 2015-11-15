var express = require('express');
var appdata = require('../data/appdata.json')
var router = express.Router();

/* GET users listing. */
router.get('/:title', function(req, res) {
  	res.render('projects', {project : req.params.title, title : req.params.title, url: req.url});
});

module.exports = router;
