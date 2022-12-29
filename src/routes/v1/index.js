const express = require('express');
const UserControllers = require('../../controllers/user-controller'); 
const {authValidator} = require('../../middlewares/index');

const router = express.Router();

router.post('/signUp',authValidator.validateUserAuth,UserControllers.create);
router.get('/isauthenticated',UserControllers.isAuthenticated);
router.get('/isadmin',authValidator.validateisAdminRequest,UserControllers.isAdmin);

router.post('/signin',authValidator.validateUserAuth,UserControllers.signIn);
router.post('/grantaccess',authValidator.validateGrantRoleRequest,UserControllers.grantRole)



module.exports = router;
