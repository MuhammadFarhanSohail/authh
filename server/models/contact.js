let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    name: String,
    number:String,
    Email: String,
    
},
{
   // collection: "contact"
   collection: "Contact" 
});

module.exports = mongoose.model('contact', contactModel);