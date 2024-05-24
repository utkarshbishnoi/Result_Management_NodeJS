//importing student model
const Student = require('../Models/Student');
const Teacher = require('../Models/Teacher');
const generateJWT =require("../Middleware/generateToken")

const teacher_login_get = (req, res) => {
    res.render("Teacher/TeacherLogin");
};

const teacher_login_post = async (req, res) => {
    //******** Teacher Login Password **********//
    try {
      const { username, password } = req.body;
      console.log(username," ",password)
      const teacher = await Teacher.findOne({ username, password });
      console.log(teacher);
      if (teacher) {
        console.log("token");
        // Generate a JWT using the user's ID and your JWT_SECRET
        const token = generateJWT(teacher._id, teacher.username);
        console.log(token);
        // Set the token as a cookie
        res.cookie("access_token", token, {
          httpOnly: true, 
          maxAge: 10 * 24 * 60 * 60 * 1000, 
        });
        res.redirect("/Teacher/All");
      } else {
        res.redirect("/Teacher/TeacherLogin");
      }
    } catch (error) {}
  };

  const teacher_logout_post = async (req, res) => {
    res.clearCookie("access_token");
  }
const teacher_viewall_get = async (req, res) => {
    const allStudents = await Student.find() 
    res.render("Teacher/All", {Student : allStudents})
};

const teacher_edit_get =async (req, res) => {
    const user = await Student.findById(req.params.id)
    const formattedDate=user.dob.toISOString().split("T")[0];
        res.render("Teacher/Edit", {user : user,dob:formattedDate})
}

const teacher_edit_post =async (req, res) => {
    const user = await Student.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/Teacher/All")
};
const teacher_delete_get =async (req, res) => {
  await Student.findByIdAndDelete(req.params.id)
  res.redirect("/Teacher/All")
};

const teacher_add_get = (req, res) => {
    res.render("Teacher/AddResult");
};

const teacher_add_post = async (req, res) => {
  try {
      // Check if req.body.dob exists and is a valid date
      if (!req.body.dob || isNaN(Date.parse(req.body.dob))) {
          throw new Error('Invalid date of birth');
      }

      const singleStudent = new Student({
          name: req.body.name,
          roll: req.body.roll,
          dob: new Date(req.body.dob).toISOString().split("T")[0],
          score: req.body.score
      });

      console.log(JSON.stringify(req.body));
      const newStudent = await singleStudent.save();
      res.redirect("/Teacher/All");
  } catch (error) {
      console.error(error);
      res.send("Error: " + error.message);
  }
};

//exporting teacher controller functions
module.exports={
    teacher_login_get,
    teacher_login_post,
    teacher_viewall_get,
    teacher_edit_get,
    teacher_edit_post,
    teacher_delete_get,
    teacher_add_post,
    teacher_add_get,
    teacher_logout_post
}