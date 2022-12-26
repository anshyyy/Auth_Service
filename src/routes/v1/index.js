const express = require('express');
const UserControllers = require('../../controllers/user-controller'); 
const {authValidator} = require('../../middlewares/index');

const router = express.Router();

router.post('/signUp',authValidator.validateUserAuth,UserControllers.create);
router.get('/isauthenticated',UserControllers.isAuthenticated);

router.post('/signin',authValidator.validateUserAuth,UserControllers.signIn);



module.exports = router;
