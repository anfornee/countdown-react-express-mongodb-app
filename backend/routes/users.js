const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users.model')

// Login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ name: req.body.name })
  const valid = await bcrypt.compare(req.body.password, user.password)
  if (!valid) {
    res.send('Invalid Password')
  } else {
    res.send(user)
  }
})

// Create New User
router.post('/signup', (req, res) => {
  // Create User
  const newUser = new User({
    name: req.body.name,
    password: req.body.password
  })
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser
        .save()
        .then(user => res.send(user))
        .catch(err => console.log(err))
    })
  })
})

module.exports = router
