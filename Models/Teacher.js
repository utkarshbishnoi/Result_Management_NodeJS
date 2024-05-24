const mongoose=require("mongoose");
const teacherScema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        required:true,
        type:String
    }
})

const Teacher=mongoose.model("Teacher",teacherScema);
module.exports=Teacher;