const mongoose=require("mongoose");
require("dotenv").config();
// const mongodbURL=process.env.MONGODB_URL_LOCAL
const mongodbURL=process.env.MONGODB_URL;

mongoose.connect(mongodbURL).then(()=>{
console.log("Mongodb Server Connected");

}).catch((error)=>{
console.log("connection error");

})

const db=mongoose.connection;

db.on("disconnected",()=>{
    console.log("Mongodb Server disconnected");
    
})