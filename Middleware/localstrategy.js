    const passport = require("passport")
    const localStrategy = require('passport-local').Strategy
    const adminModel = require('../Models/Admin.model')
    const bcrypt = require('bcrypt')

    passport.use(new localStrategy(
        {
            usernameField:'email'
        },
        async(email,password,cb)=>{
        let admin = await adminModel.findOne({email:email})
        if(!admin){
                
                return   cb(null,false,{ message: 'Incorrect Email' })

        }

        let matchpassword  = await bcrypt.compare(password,admin.password)
        if(!matchpassword){
            return cb(null,false,{ message: 'Incorrect password' })
        }

        return cb(null,admin)
        }
    ))


    passport.serializeUser((user,cb)=>{
    return cb(null,user.id)

    })

    passport.deserializeUser(async(id,cb)=>{
    let admin = await adminModel.findById(id)
    if(admin){
        cb(null,admin)
    }
    })


    passport.checkAuthenticated =(req,res,next)=>{
        if(req.isAuthenticated()){
            return next()
        }
    res.clearCookie('user');
        return res.redirect('/user/login')
    }

    passport.isAuthenticated=(req,res,next)=>{
        if(req.isAuthenticated()){
            res.locals.user =req.user
        }  

        return next()
    }


    module.exports = passport