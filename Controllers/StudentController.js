//importing student model
const Student = require('../Models/Student');

const student_login_get = (req, res) => {
       res.render("student/Login");
    };

const student_login_post = async (req, res) => {

        const Roll = req.body.roll;   
        const individualStudent = await Student.findOne({roll : Roll});    
        if(!individualStudent){
          res.render("student/Login", {
            error : "Login with Correct Credentials"
          })
        }      
        res.render("student/View", { one : individualStudent});
    };

//exporting student controller functions
module.exports={
    student_login_get,
    student_login_post
}