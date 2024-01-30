const mongoose = require('mongoose')
require('dotenv').config()

const db = process.env.dblink

mongoose.connect(db)
.then(()=>{
    console.log(`Database connection established successfully`)
})
.catch((err)=>{
    console.log(`Error connecting to database: ${err.message}`)
})