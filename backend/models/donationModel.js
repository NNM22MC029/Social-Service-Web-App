const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'user', required : true},
    name : {type : String, required : true},
    amount : {type : Number, required : true},
    message : {type : String, required : true},
    category : {type : String, enum : ['health', 'education', 'food', 'indiadonation'], required : true},
    country : {type : String, required : true},
    date : {type : Date, default : Date.now, required : true}
})

const DonationModel = mongoose.model('donation', donationSchema);

module.exports = DonationModel;
