var mongoose = require('mongoose');

var MakeSchema = new mongoose.Schema({

  name : { type : String,require : true,unique : true},
  isDelete:{ type: Boolean, default: false }

});

MakeSchema.path('name').validate(function (value) {

  return value.trim() != ""

}, 'Name should not empty');

module.exports = mongoose.model('Make',MakeSchema);