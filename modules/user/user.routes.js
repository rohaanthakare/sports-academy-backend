const express = require('express');
const UserCtrl = require('./user.controller');

const userRoutes = express.Router();
userRoutes.post('/register_user', UserCtrl.registerUser);

module.exports = userRoutes;