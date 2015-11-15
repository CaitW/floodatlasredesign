var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Tools', url : req.url});
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About', url : req.url});
});

router.get('/wisconsin-shoreline-inventory-and-oblique-photo-viewer-data-and-photos', function(req, res) {
  res.render('obliquedata', { title: 'Data', url : req.url});
});


module.exports = router;
