const mongoose  = require("mongoose");

 mongoose.connect("mongodb+srv://JeevanJose:Cluster0@cluster0.xflbwpk.mongodb.net/Expense-Tracker", {useNewUrlParser : true , useUnifiedTopology : true});

const connection = mongoose.connection;

connection.on("error" , err =>
console.log(err)
);

connection.on("connected" ,() =>console.log("MongoDB connection successful"));
