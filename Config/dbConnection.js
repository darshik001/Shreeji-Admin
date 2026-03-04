const mongoose = require('mongoose')
require('dotenv').config()

const dbconnection = ()=>{
        mongoose.connect(process.env.MONGODB_URL)
        .then(()=>console.log('Database is Connected'))
        .catch(err=>console.log("error",err))
   }

   module.exports = dbconnection()