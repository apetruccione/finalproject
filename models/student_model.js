var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudentItem = new Schema({
    itemname: String,
    itemtype: String,
    itemdescription: String
});

var StudentSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    fname: String,
    lname: String,
    items: [StudentItem]
});
mongoose.model('Student', StudentSchema);
mongoose.model('StudentItem', StudentItem);

