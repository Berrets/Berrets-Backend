const express = require('express');
const { detectGrain } = require('../controller/detectController');
const { registerUser, loginUser, getEmailUser, getUsers } = require('../controller/userController');
const { detectValidate } = require('../utils/detectValidation');
const { userRegisterValidate, userLoginValidate, userEmailValidate } = require('../utils/userValidation');
const { ensureAuthenticated } = require('../utils/auth');
const routes = express.Router();

routes.post('/get-email', userEmailValidate, getEmailUser);
routes.post('/register', userRegisterValidate, registerUser);
routes.post('/login', userLoginValidate, loginUser);
routes.get('/users', ensureAuthenticated, getUsers);

routes.post('/detects', ensureAuthenticated, detectValidate, detectGrain);

module.exports = routes;