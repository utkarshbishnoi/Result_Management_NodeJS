var express = require("express");
const router = express.Router();
const StudentController = require('../Controllers/StudentController');

router.get('/login',StudentController.student_login_get);
router.post('/login',StudentController.student_login_post);

module.exports = router;