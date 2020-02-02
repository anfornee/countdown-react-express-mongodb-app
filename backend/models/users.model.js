const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
