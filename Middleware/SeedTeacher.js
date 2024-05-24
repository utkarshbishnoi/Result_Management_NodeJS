const Teacher=require("../Models/Teacher");
const TeacherData={
    username:"teacher",
    password:"password",
}

async function seedTeacher(){
    try {
        const teacher=new Teacher(TeacherData);
        await teacher.save();
        console.log("success seeding");
    } catch (error) {
        console.log("Error seeding")
    }
}
module.exports=seedTeacher;