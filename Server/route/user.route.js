const express = require('express');
const middleware = require('../middleware/isAuthentication')
const multer = require('../middleware/multer.js');
const { register, login, logout, getAllUser } = require('../controller/User.Controller');
const router = express.Router();

router.post('/register', multer.single('profile'), register);
router.post('/login', login);
router.get('/get', getAllUser)
router.get('/logout', logout)

module.exports = router