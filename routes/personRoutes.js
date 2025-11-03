const express=require("express");
const Person=require("../models/person")
const router=express.Router()


router.post("/",async (req,res)=>{
try {
    const savedPerson=await new Person(req.body).save();
    res.status(200).json(savedPerson);
    console.log("Data Saved");
    
} catch (error) {
   console.error(" Internal error occurred:", error.message);
    res.status(500).json({ error: "Internal server error" });
}
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in fetch the data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id",async (req,res)=>{
  try {
    const personId=req.params.id;
  const updatedPersonId=req.body;
  const response= await Person.findByIdAndUpdate(personId,updatedPersonId,{
    new:true, // return the updated document 
    runValidators:true, //run mongoose validation
  }) 
  if (!response) {
    res.status(404).send({error:"person not found"})
  }
  console.log("data updated");
  res.status(200).json(response)
  
  } catch (error) {
    console.log(error);
    res.status(500).send({error:"internal server error"})
    
  }
})

router.delete("/:id",async (req,res)=>{
  try {
    const personId=req.params.id
    const response=await Person.findByIdAndDelete(personId)
     if (!response) {
    res.status(404).send({error:"person not found"})
  }
    console.log("data deleted");
  res.status(200).json({message:"person deleted successfully"})

  } catch (error) {
    console.log(error);
    res.status(500).send({error:"internal server error"})
    
  }
})

module.exports=router; 