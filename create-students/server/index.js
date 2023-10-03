const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");

// create express app
const app = express()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions ={
    origin:'*', 
    credentials:true,//access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

// route
const routes = require('./routes/Routes')
app.use('/', routes)

//start server
app.listen(3001, () => {
    console.log("listening at port:3001")
})