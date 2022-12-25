const express = require('express');
const UserControllers = require('../../controllers/user-controller'); 

const router = express.Router();

router.post('/signUp',UserControllers.create);
router.get('/getUser',UserControllers.getUser);



module.exports = router;
