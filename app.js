const express = require('express')
// require('dotenv').config()
require('./Config/dbConnection')

const passport = require('passport')
const session = require('express-session')
const localsstrategy = require('./Middleware/localstrategy')
const app = express()
const port = 8080


app.set('view engine','ejs')
app.use(express.urlencoded())
app.use(express.static('public'))
app.use('/uploads',express.static('uploads'))

app.use(session({
    name:'user',
    secret:'devlop',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.isAuthenticated)


app.use('/',require('./Routes/index.routes'))


app.listen(port,()=>{
    console.log(`server start at http://localhost:${port}`)
})