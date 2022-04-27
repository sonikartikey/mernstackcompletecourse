const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  phone: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
 
  messages: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  
    phone: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }],

  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]

})

//genrating JWT 
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    console.log(` i am herw ${token}`)
    await this.save()
    return token
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}

//Hashing the password here

// to check pre condition for bcytppt  ,, this is middleware using bcrypt
userSchema.pre("save", async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
    this.cpassword = await bcrypt.hash(this.password, 10)
  }
  next();
})

//store the message 
userSchema.methods.addMessage = async function (name, email , phone , message) {
  try {
   
    this.messages = this.messages.concat({ name, email , phone , message })
    await this.save()
    return this.messages

  } catch (error) {
    res.send(error)
    console.log(error)
  }
}


const User = new mongoose.model("USER", userSchema);

module.exports = User;