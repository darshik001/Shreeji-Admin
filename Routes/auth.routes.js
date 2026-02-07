const express = require('express')
const { loginPage, login, logOut, profilepage } = require('../Controller/auth.controller')
const passport = require('passport')
const routes = express.Router()


// login 
routes.get('/login',loginPage)
routes.post('/login',passport.authenticate('local',{failureRedirect:'/user/login',failureFlash:true}),login)


//logout
routes.get('/logout',logOut)


//profile page
routes.get('/profile',profilepage)
module.exports = routes