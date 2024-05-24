const jwt=require("jsonwebtoken");
const json_sec="adsfasdghahdskfas";
const generateToken=(userId,password)=>{
    return jwt.sign({id:userId,password},json_sec,{
        expiresIn:"10d",
    });
}
module.exports=generateToken;