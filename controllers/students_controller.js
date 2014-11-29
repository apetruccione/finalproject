
var mongoose = require('mongoose'),
 	Student = mongoose.model('Student');
var url = require("url");

exports.getStudentsList = function(req, res) {
  Student.find()
  .exec(function(err, students) {
    if (!students){
      res.json(404, {err: 'Student Not Found.'});
    } else {
      res.json(students);
    }
  });
};

exports.getStudentByUsername = function(req, res) {
 
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query; 
    
    console.log('\nQuery URL: ' + req.originalUrl);
    console.log(query.username);
  
    var search = Student.find({'username': query.username});
    search.exec(function(err, docs) {
    if (err) {
        console.log(err);
    }

    res.json(docs[0]);
    });

};

exports.addItem = function(req, res) {
 
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query; 
    
    console.log("Adding items to student item.")
    console.log('\nQuery URL: ' + req.originalUrl);
    console.log(query.username);
    console.log(query.itemtype);
    console.log(query.itemname);
    console.log(query.itemdescription);

    var search = Student.find({'username': query.username});
    search.exec(function(err, docs) {
    if (err) {
        console.log(err);
    }
    
    docs[0].items.push({ 
      itemname: query.itemname,
      itemtype: query.itemtype,
      itemdescription: query.itemdescription 

    });

    docs[0].save(function (err) {
    if (!err)
    console.log('Success!');
    });

    res.json(docs[0]);

    });
  
};

