const express = require('express')
const cors = require('cors')

const feedRouter=require('./router/feedRouter')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session=require('express-session')
const app= express()

app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","DELETE"],
    credentials:true,
}))

app.use(cookieParser())

app.use(session({
    key:"userId",
    secret:"newsFeed",
    resave: false,
    saveUninitialized:false,
    cookie:{
        expires:60*60*24*1000
    }
}))
app.use(feedRouter)

app.listen(9999,console.log('server run'))