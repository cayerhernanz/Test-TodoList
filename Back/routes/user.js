//Router user
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passwordVerification = require('../middleware/passwordVerification');

//routes signin et login
router.post('/signin', passwordVerification, userController.signIn);
router.post('/login', userController.logIn);

module.exports = router;