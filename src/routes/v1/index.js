const express = require('express');
const UserControllers = require('../../controllers/user-controller'); 

const router = express.Router();

router.post('/signUp',UserControllers.create);


module.exports = router;
