const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userID :{
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    type:{
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    date: {
        type : Date,
        required : true
    },
    reference: {
        type : String,
        required : false
    },
    description: {
        type : String,
        required : true
    }

})

const transactionmodel = mongoose.model('transactions' , transactionSchema)

module.exports = transactionmodel