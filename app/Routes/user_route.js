const express = require('express');
const userController = require('../Controllers/user_controller');
const router = express.Router();


router.post('/signup', userController.signUp);
router.get('/', userController.getUsers);
router.post('/signin', userController.signIn);


module.exports = router;
