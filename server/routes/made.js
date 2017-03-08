'use strict';


var express = require('express');
var router = express.Router();
var Made = require("../models/made.js");

router.get('/search' , function(req, res, next) {
	req.query.isDelete = false;
	Made.find(req.query).exec(function(error,all){
		if(error) return res.mSendError(error);
		
		return res.mSendResults({"all" : all});

	});

});


module.exports = router;
