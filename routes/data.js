var express = require('express');
var appdata = require('../data/appdata.json')
var router = express.Router();
var pg = require('pg')
var _ =require('underscore')
var conString = "postgres://floodatlas_user:phUR5Fru0@localhost/floodatlas_db";

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");

  next();
});

router.get('/', function(req, res) {
	var client = new pg.Client(conString);
	var x = {url : req.url}
	client.connect(function(err) {
	  if(err) {
	    return console.error('could not connect to postgres', err);
	  }else{
	  	 var query = client.query("SELECT * FROM datafiles");
	  	 	query.on('row', function(row,result) { result.addRow(row); });
	  		query.on('end', function(result) {
	  			x['myResult'] = result;
	  			notBatch = ((result.rows).filter(function(d, i){ return d.batch!=true }) ).map(function(d, i){ return d.title})
	  			x['headings'] = _.uniq(notBatch)
	  			x['title'] = 'Data Portal';
	  			x['project'] = "";

      		res.render('data', x)
    	});


	  }

	})

});
router.get('/query?:queryString', function(req, res) {
	var queryString = req.query
	queryKeys = _.keys(queryString)
	queryValues = []
	string = "SELECT * FROM datafiles"
	queryKeys.forEach(function(d,i){
		if (i==0){
			string=string.concat(" WHERE")
		}else{
			string=string.concat(" AND")
		}
		string=string.concat(" "+d+" = $"+(i+1)+"")
		queryValues.push(queryString[d])
	})
	var client = new pg.Client(conString);
	var x = {url : req.url}
	client.connect(function(err) {
	  if(err) {
	    return console.error('could not connect to postgres', err);
	  }else{
	  	 var query = client.query({
		      text: string,
		      values: queryValues,
		      name: 'literal query'
		    });
	  	 	query.on('row', function(row,result) { result.addRow(row); });
	  		query.on('end', function(result) {
	  			x['myResult'] = result;
	  			notBatch = ((result.rows).filter(function(d, i){ return d.batch!=true }) ).map(function(d, i){ return d.title})
	  			x['headings'] = _.uniq(notBatch)
	  			x['title'] = 'Data Portal';
	  			x['project'] = "";

      		res.render('data', x)
    	});


	  }

	})

});
router.get('/:column/:columnValue', function(req, res) {
	var column = req.params.column
	var columnValue = req.params.columnValue
	var client = new pg.Client(conString);
	var x = {url : req.url}
	client.connect(function(err) {
	  if(err) {
	    return console.error('could not connect to postgres', err);
	  }else{
	  	 var query = client.query({
		      text: "SELECT * FROM datafiles WHERE "+column+" = $1",
		      values: [columnValue],
		      name: 'query by single column'
		    });
	  	 	query.on('row', function(row,result) { result.addRow(row); });
	  		query.on('end', function(result) {
	  			x['myResult'] = result;
	  			notBatch = ((result.rows).filter(function(d, i){ return d.batch!=true }) ).map(function(d, i){ return d.title})
	  			console.log(notBatch)
	  			x['headings'] = _.uniq(notBatch)
	  			x['title'] = 'Data Portal';
	  			x['project'] = columnValue;

      		res.render('data', x)
    	});


	  }

	})

});

module.exports = router;
