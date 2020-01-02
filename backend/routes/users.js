const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users.model')

// Login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ name: req.body.name })
  const valid = await bcrypt.compare(req.body.password, user.password)
  if (!valid) {
    console.log('Invalid Password')
  }
  res.send(user)
})

// Create New User
router.post('/signup', async (req, res) => {
  // Password Hashing
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create User
  const newUser = new User({
    name: req.body.name,
    password: req.body.password
  })
  newUser.save()
    .then(() => res.status(200).json(newUser))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
