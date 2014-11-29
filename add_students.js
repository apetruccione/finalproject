//bring in the module
var mongoose = require('mongoose');

var connString = "mongodb://" + "127.0.0.1" + ":27017/";
var dbName = "testDB";

//connect
var db = mongoose.connect(connString + dbName);

//get the schema - notice how we use the export
var studentSchema = require('./models/student_model.js').StudentSchema;
var itemSchema = require('./models/student_model.js').StudentItem;

var Student = mongoose.model('Student', studentSchema);
var StudentItem = mongoose.model('StudentItem', itemSchema);

setTimeout(function() {
    mongoose.disconnect();
}, 5000);

//again, once is the event-handling "hook" for when the database is opened
mongoose.connection.once('open', function() {

    //we create a new instance off the Model object

    var i1 = new StudentItem({

        itemname: "Interview with a Vampire",
        itemtype: "Interview",
        itemdescription: "Louis de pont Luac is a very moody vampire. The interview took a long time."

    });

        var i2 = new StudentItem({

        itemname: "Resume Workshop",
        itemtype: "Resume",
        itemdescription: "The student attended a resume workshop here at WT. The result looks nice."

    });

    var s1 = new Student({
        username: "Jbabb",
        fname: "Jeff",
        lname: "Babb",
        email: "jbabb@wtamu.edu"
    });
    
    var s2 = new Student({
        username: 'APetrucionne',
        fname: "Anthony",
        lname: "Petruccione",
        email: "apetruccione@wtamu.edu",
        items: [i1, i2]

    });


    Student.create([s1, s2,], function(err, records) {

        var query = Student.find();
        query.exec(function(err, docs) {
            console.log("\n A list of students.");
            for (var i in docs) {
                
                console.log(JSON.stringify(docs[i].fname));
                console.log(JSON.stringify(docs[i].lname));
                console.log(JSON.stringify(docs[i].username));
                console.log();
            }
        });
        
    });
});