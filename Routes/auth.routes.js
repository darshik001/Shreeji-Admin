const express = require('express')
const { loginPage, login } = require('../Controller/auth.controller')
const passport = require('passport')
const routes = express.Router()

routes.get('/login',loginPage)
routes.post('/login',passport.authenticate('local',{failureRedirect:'/user/login'}),login)

module.exports = routes