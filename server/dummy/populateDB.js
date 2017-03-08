
var mongoose = require('mongoose');
var makes = require('./makes.json');
var mades = require('./mades.json');
var Make = require('./../models/make');
var Made = require('./../models/made');
/**
 * Connect To Mongo and reset Data
 * In production/Staging this is not recommended. We are doing this only for demo.
 */
var madesPopulated = 0;
mongoose.connect('mongodb://localhost/techolution',function(error){
  if(error) return console.log(error);


  mongoose.connection.db.dropDatabase();

  makes.forEach(function(item){
    Make.create(item,function(error,savedMake){
      if(error) console.log(error);

      mades[savedMake.name].forEach(function(item){
        Made.create({ name : item.name,description: item.description, makeId : savedMake._id,imageUrl:item.imageUrl },function(error,savedModel){
          if(error) console.log(error);
          madesPopulated++;
          if(madesPopulated === 4){
            return console.log('populated successfully');
          }
        });

      });

    });
  });
});