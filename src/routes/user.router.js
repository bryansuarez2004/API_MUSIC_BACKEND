const { getAll,create, addFavoriteTracks, removeFavoriteTracks, getFavoritesTracks } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAll)

userRouter.route('/register')    
    .post(create);

userRouter.route('/:id/favoriteTracks')
    .get(getFavoritesTracks)    

userRouter.route('/:id/addTracks/:spotifyId')
    .post(addFavoriteTracks)
 

userRouter.route('/:id/removeTracks/:spotifyId')
    .post(removeFavoriteTracks)






module.exports = userRouter;