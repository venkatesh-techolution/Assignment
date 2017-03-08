'use strict';


var express = require('express');
var router = express.Router();
var Make = require("../models/make.js");


router.get('/all' , function(req, res, next) {

	Make.find({isDelete : false}).exec(function(error,all){
		if(error) return res.mSendError(error);
		
		return res.mSendResults({"all" : all});

	});

});

module.exports = router;
