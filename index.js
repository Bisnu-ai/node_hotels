const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT||3000;
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/person");

app.get("/", (req, res) => {
  res.send("hey This is HomePage");
});
app.get("/person/:workType",async (req,res)=>{
try {
  const workType= req.params.workType;
if (workType=='chef'||workType=='manager'||workType=='waiter') {
  const response=await Person.find({work:workType})
  console.log("response fetched");
  res.status(200).json(response);
  
}else{
  res.status(404).json({error:"Not found"})
}
} catch (error) {
  console.log(error);
  res.status(500).json({error:"internal server error"})
  
}

})

const personRoutes=require("./routes/personRoutes")
app.use("/person",personRoutes);

app.listen(PORT, () => {
  console.log(`server started at: ${PORT}`);
});
