const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authenticate')
const cookieParser = require("cookie-parser")

router.use(cookieParser())

// require('../db/conn');
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("hello I amher")
})


//Using Asynch Await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.send("Error")
  }

  try {
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      return res.status(422).send("already exists")
    }
    else if (password !== cpassword) {
      return res.status(422).send("Pasword Not Matchhing ")
    }
    else {
      const user = new User(req.body)
      //to use middle ware in userSchema
      await user.save();

      res.status(201).send("User Added")
    }
  }
  catch (err) {
    console.log("eeror in 1syt then")
  }
})

//Using Promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.send("Error")
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).send("already exists")
//       }
//       const user = new User({ name, email, phone, work, password, cpassword })
//       user.save()
//         .then(() => {
//           res.status(201).send("User Added")
//         })
//         .catch((err) => { res.status(500).send("failed to register") })
//     })
//     .catch((err) => { console.log("eeror in 1syt then") })
// })


//Login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!password || !email) {
      return res.status(400).send("Please fill the data")
    }
    const userLogin = await User.findOne({ email: email })

    const token = await userLogin.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 5000000),
      httpOnly: true
    })

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password)

      if (!isMatch) {
        console.log("here it is breaking2")
        res.status(400).send("Password Not match registered")
      }
      else {
        console.log("here it is successful")
        res.status(200).send("Success Lgin")
      }
    } else {
      console.log("here it is breaking4")

      res.status(400).send("There is no email Id registered")
    }
  }
  catch (err) {
    console.log("error in try")
  }
})

//about us ka page
router.get("/about", authenticate, (req, res) => {
  console.log("hello i ma in about page")
  res.send(req.rootUser)
})

//get data for contact
router.get("/getdata", authenticate, (req, res) => {
  console.log("hello i ma in about page")
  res.send(req.rootUser)
})

//contact message page 
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body
    if (!name || !email || !phone || !message) {
      console.log("Please fill the contact form")
      return res.status(400).send("Please fill the contact form")
    }
    const usercontact = await User.findOne({ _id: req.userId })
    if (usercontact) {

      const userMessage = await usercontact.addMessage(name, email, phone, message)
      await usercontact.save()
      res.status(200).json({ message: "user contact message" })
    }
  }

  catch (err) {
    console.log("eeror in 1syt then")
  }

})

//Logout ka page
router.get("/logout", (req, res) => {
  console.log("hello i Logout page")
  res.clearCookie('jwt', { path: "/" });
  res.status(200).send('user Logout')
})


module.exports = router