const { getAll,create } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)

userRouter.route('/register')    
    .post(create);




module.exports = userRouter;