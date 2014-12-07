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

        var i3 = new StudentItem({
        itemname: "Resume Workshop",
        itemtype: "Resume",
        itemdescription: "The student attended a resume workshop here at WT. The result looks nice."

    });


        var i4 = new StudentItem({
        itemname: "Endorsments",
        itemtype: "Endorsments",
        itemdescription: "Letter of Endorsments for student."

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

    var s3= new Student({
        username: 'AMagallanes',
        fname: 'Alejandro',
        lname: 'Magallanes',
        email: 'amagallanes@email.com',
        items:  [i3,i4]
    });


    var s4= new Student({
        username: 'BDunlap',
        fname: 'Brett',
        lname: 'Dunlap',
        email: 'bdunlap@email.com',
        items:  [i3,i4]
    });


    var s5= new Student({
        username: 'DBurns',
        fname: 'Derrick',
        lname: 'Burns',
        email: 'dburns@email.com',
        items:  [i3,i4]
    });


    var s6= new Student({
        username: 'CHee',
        fname: 'Chern',
        lname: 'Hee',
        email: 'chee@email.com',
        items:  [i3,i4]
    });


    var s7= new Student({
        username: 'LAlvarez',
        fname: 'Lauren',
        lname: 'Alvarez',
        email: 'lavarez@email.com',
        items:  [i3,i4]
    });


    var s8= new Student({
        username: 'RMata',
        fname: 'Rodrigo',
        lname: 'Mata',
        email: 'rmata@email.com',
        items:  [i3,i4]
    });


    var s9= new Student({
        username: 'LHackbarth',
        fname: 'Lelland',
        lname: 'Hackbarth',
        email: 'lhackbarth@email.com',
        items:  [i3,i4]
    });


    var s10= new Student({
        username: 'DBell',
        fname: 'Dustin',
        lname: 'Bell',
        email: 'dbell@email.com',
        items:  [i3,i4]
    });


    var s11 = new Student({
        username: 'JBrittenham',
        fname: 'Jordan',
        lname: 'Brittenham',
        email: 'jbrittenham@email.com',
        items:  [i3,i4]
    });


    var s12= new Student({
        username: 'CSecia',
        fname: 'Secia',
        lname: 'Chase',
        email: 'schase@email.com',
        items:  [i3,i4]
    });


    var s13= new Student({
        username: 'MGomez',
        fname: 'Mayra',
        lname: 'Gomez',
        email: 'mgomez@email.com',
        items:  [i3,i4]
    });


    var s14= new Student({
        username: 'JMadison',
        fname: 'Jason',
        lname: 'Madison',
        email: 'jmadison@email.com',
        items:  [i3,i4]
    })


    var s15= new Student({
        username: 'JRitter',
        fname: 'James',
        lname: 'Ritter',
        email: 'jritter@email.com',
        items:  [i3,i4]
    })


    var s16 = new Student({
        username: 'SSchmidt',
        fname: 'Skyler',
        lname: 'Schmidt',
        email: 'sschmidt@email.com',
        items:  [i3,i4]
    })

    Student.create([s1, s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16], function(err, records) {

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