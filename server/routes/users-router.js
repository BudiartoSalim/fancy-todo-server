const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users-controller.js');

router.post('/register', UserController.registerPostHandler);
router.post('/login', UserController.loginPostHandler);
router.post('/googlesignin', UserController.googleSignInHandler);

module.exports = router;