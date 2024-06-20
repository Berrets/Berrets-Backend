const express = require('express');
const { createData, getAllData, getDataById, updateData, deleteData } = require('../controller/detectController');
const { registerUser, loginUser, getEmailUser, getUsers } = require('../controller/userController');
const { dataValidate, updateDataValidate } = require('../utils/detectValidation');
const { userRegisterValidate, userLoginValidate, userEmailValidate } = require('../utils/userValidation');
const { ensureAuthenticated } = require('../utils/auth');
const routes = express.Router();

routes.post('/get-email', userEmailValidate, getEmailUser);
routes.post('/register', userRegisterValidate, registerUser);
routes.post('/login', userLoginValidate, loginUser);
routes.get('/users', ensureAuthenticated, getUsers);

routes.post('/create-data', ensureAuthenticated, dataValidate, createData);
routes.get('/get-all-data', ensureAuthenticated, getAllData);
routes.get('/get-data/:id', ensureAuthenticated, getDataById);
routes.put('/update-data/:id', ensureAuthenticated, updateDataValidate, updateData);
routes.delete('/delete-data/:id', ensureAuthenticated, deleteData);

module.exports = routes;