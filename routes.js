const express = require('express');
const userRoutes = require('./modules/user/user.routes');

const routes = express.Router();

routes.use('/user', userRoutes);
module.exports = routes;
module.exports.ROUTES_WIHTOUT_AUTH = ['/api/user/authenticate_user'];