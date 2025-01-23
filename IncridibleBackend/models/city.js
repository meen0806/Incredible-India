import mongoose from "mongoose";


const citySchema = mongoose.Schema({
    name : {type : String , required : true},
    description : {type : String , required : true},
    imageUrl : {type : String , required : true},
    touristSpots : [{type : mongoose.Schema.Types.ObjectId ,ref: 'TouristSpot', required : true}],
    state : {type : mongoose.Schema.Types.ObjectId ,ref: 'State', required : true},
    bestTimeToVisit : {type : String , required : true},
});

export const City = mongoose.model('City',citySchema);