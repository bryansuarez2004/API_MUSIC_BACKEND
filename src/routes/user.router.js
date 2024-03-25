const { getAll,create, addFavoriteTracks, removeFavoriteTracks, getFavoritesTracks, login } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT, getAll)

userRouter.route('/register')    
    .post(create);
 
userRouter.route('/login') 
    .post(login)   

userRouter.route('/favoriteTracks')
    .get(verifyJWT, getFavoritesTracks)       


userRouter.route('/addTracks/:spotifyId')
    .post(verifyJWT, addFavoriteTracks)
 

userRouter.route('/removeTracks/:spotifyId')
    .delete(verifyJWT, removeFavoriteTracks)










module.exports = userRouter;