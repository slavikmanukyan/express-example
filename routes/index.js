const { Router } = require('express');
const userRouter = require('./users');
const homeRouter = require('./home');


const routes = Router();

routes.use('/users', userRouter);
routes.use('/home', homeRouter);

module.exports = routes;