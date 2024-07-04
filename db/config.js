// const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/Chat-app");


const mongoose = require("mongoose");
const DB = process.env.DATABASE.toString();
mongoose.connect(DB).then(()=>console.log("Databse Connected")).catch((err)=>{
    console.log(err);
})

