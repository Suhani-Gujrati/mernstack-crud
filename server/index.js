const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
app.use(cors());
app.use(express.json())
const PORT=process.env.PORT||8080;


const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:String
},{
    timestamps:true
})

//read
const userModel=mongoose.model("user",schemaData)
app.get("/",async(req,res)=>{
    const data= await userModel.find({})
    console.log(data);
    res.json({sucess:true, data:data});
})

//create
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true, message:"data is saved successfully",data:data});
})

//update
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id, ...rest}=req.body
    console.log(rest)
  const data=await userModel.updateOne({_id:_id},rest)
    res.send({sucess:true, message:"data updated",data:data});
})


//delete
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const data=await userModel.deleteOne({_id:id})
    res.send({success:true,message:"deleted",data:data});
})

mongoose.connect("mongodb://127.0.0.1:27017/crudapplication")
.then(()=>{
    console.log("db connected"),
app.listen(PORT,()=>console.log("server is running"));
})
.catch((err)=>console.log(err));