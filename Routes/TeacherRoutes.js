var express = require('express');
const router = express.Router();
const TeacherController = require('../Controllers/TeacherController');
const { isAuthenticated } = require('../Middleware/auth');

router.get('/login',TeacherController.teacher_login_get);
router.post('/login',TeacherController.teacher_login_post);
router.post('/logout',TeacherController.teacher_logout_post);
router.use(isAuthenticated);
router.get('/All',TeacherController.teacher_viewall_get);
router.get('/edit/:id',TeacherController.teacher_edit_get);
router.post('/edit/:id',TeacherController.teacher_edit_post);
router.get('/delete/:id',TeacherController.teacher_delete_get);
router.post('/AddResult',TeacherController.teacher_add_post);
router.get('/AddResult',TeacherController.teacher_add_get);
    
module.exports = router;