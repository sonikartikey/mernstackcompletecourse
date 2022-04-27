const dotenv = require('dotenv')
const mongoose = require('mongoose');
const express = require('express');
require('./db/conn');
const cookieParser = require('cookie-parser')

// const User = require('./models/userSchema');

const app = express();

const userRouter = require("./router/auth")

app.use(express.json())
//3 : register a router 
app.use(userRouter)

app.use(cookieParser())


dotenv.config({ path: './config.env' })
const PORT = process.env.PORT || 5000;

// app.get("/about", middleware, (req, res) => {
//     res.send("hello I about")
// })

// app.get("/contact", (req, res) => {
//     res.send("hello I contact")
// })

app.get("/signin", (req, res) => {
  res.send("hello I login")
})


app.get("/singup", (req, res) => {
  res.send("hello I signup")
})

//middleware

// const middleware = (req, res, next) => {
//     console.log("hello i am herer")
//     next();
// }

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}



app.listen(PORT, () => { console.log('connection success', PORT) })