const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name : 
    {
        type : String,
        required : true
    },
    coordinates : String,
    country : 
    {
        type : String,
    },
    temperature :
    {
        type : Number,
         required : true
    },
    condition : 
    {
        type : String,
    },
    humidity :
    {
        type : Number,
        
    },
    wind_speed : 
    {
        type : Number,
    },
    cloudcover : 
    {
        type : Number,
    }
});

const City = mongoose.model('City' , citySchema);

module.exports = City