const { getAll,create, addFavoriteTracks } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)

    userRouter.route('/:id/addTracks/:spotifyId')
    .post(addFavoriteTracks)
 

userRouter.route('/register')    
    .post(create);




module.exports = userRouter;