const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{type:String,require:true,trim:true},
    email:{type:String,require:true,trim:true},
    mobile:{type:Number},
    password:{type:String,require:true},
})
module.exports=mongoose.model("user",userSchema)