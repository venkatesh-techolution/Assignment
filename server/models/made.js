var mongoose = require('mongoose');
var Make = require('./make');


var ObjectId = mongoose.Schema.Types.ObjectId;

var MadeSchema = new mongoose.Schema({

  makeId :  { type : ObjectId,require : true,ref:"Make"},
  name : String,
  imageUrl: String,
  description: String,
  isDelete:{ type: Boolean, default: false }

});


MadeSchema.path('makeId').validate(function (value, respond) {

    Make.findOne({_id: value}, function (error, doc) {
        if (error || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'brandId  validation failed');

module.exports = mongoose.model('Made',MadeSchema);