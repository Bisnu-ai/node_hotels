const mongoose=require("mongoose");

const mongodbURL="mongodb://localhost:27017/hotels"

mongoose.connect(mongodbURL).then(()=>{
console.log("Mongodb Server Connected");

}).catch((error)=>{
console.log("connection error");

})

const db=mongoose.connection;

db.on("disconnected",()=>{
    console.log("Mongodb Server disconnected");
    
})